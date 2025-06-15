#!/bin/bash

# Automation Empire - Master Deployment Script
# "Deploy with the force of a thousand suns"

set -e

echo "🏛️ AUTOMATION EMPIRE - DEPLOYMENT INITIATED"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
RESOURCE_GROUP="automation-empire-rg"
LOCATION="eastus2"
APP_NAME="automation-empire"
STORAGE_ACCOUNT="automationempire$(openssl rand -hex 4)"

# Step 1: Create Resource Group
echo -e "\n${YELLOW}[1/7] Creating Resource Group...${NC}"
az group create --name $RESOURCE_GROUP --location $LOCATION --output table

# Step 2: Create Storage Account
echo -e "\n${YELLOW}[2/7] Creating Storage Account...${NC}"
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS \
  --kind StorageV2 \
  --output table

# Step 3: Create Container Apps Environment
echo -e "\n${YELLOW}[3/7] Creating Container Apps Environment...${NC}"
az containerapp env create \
  --name "${APP_NAME}-env" \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --output table

# Step 4: Build and Deploy Website
echo -e "\n${YELLOW}[4/7] Building Website...${NC}"
cd website
npm install
npm run build

# Create Dockerfile for website
cat > Dockerfile << 'EOF'
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
EOF

# Build and push to ACR
echo -e "\n${YELLOW}[5/7] Building and Pushing Docker Image...${NC}"
ACR_NAME="${APP_NAME}acr$(openssl rand -hex 4)"
az acr create \
  --resource-group $RESOURCE_GROUP \
  --name $ACR_NAME \
  --sku Basic \
  --admin-enabled true \
  --output table

# Get ACR credentials
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --query loginServer --output tsv)
ACR_USERNAME=$(az acr credential show --name $ACR_NAME --query username --output tsv)
ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --query passwords[0].value --output tsv)

# Build and push image
docker build -t $ACR_LOGIN_SERVER/empire-website:latest .
docker login $ACR_LOGIN_SERVER -u $ACR_USERNAME -p $ACR_PASSWORD
docker push $ACR_LOGIN_SERVER/empire-website:latest

# Step 6: Deploy to Container Apps
echo -e "\n${YELLOW}[6/7] Deploying to Container Apps...${NC}"
az containerapp create \
  --name "${APP_NAME}-website" \
  --resource-group $RESOURCE_GROUP \
  --environment "${APP_NAME}-env" \
  --image $ACR_LOGIN_SERVER/empire-website:latest \
  --target-port 3000 \
  --ingress 'external' \
  --registry-server $ACR_LOGIN_SERVER \
  --registry-username $ACR_USERNAME \
  --registry-password $ACR_PASSWORD \
  --cpu 0.5 \
  --memory 1.0 \
  --min-replicas 1 \
  --max-replicas 10 \
  --output table

# Get the app URL
APP_URL=$(az containerapp show \
  --name "${APP_NAME}-website" \
  --resource-group $RESOURCE_GROUP \
  --query properties.configuration.ingress.fqdn \
  --output tsv)

# Step 7: Deploy n8n workflows
echo -e "\n${YELLOW}[7/7] Deploying n8n Workflows...${NC}"
cd ../workflows
./deploy-workflows.sh

echo -e "\n${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo -e "\n🌐 Your Empire is Live at: https://$APP_URL"
echo -e "📊 n8n Dashboard: https://n8n-app.livelypebble-c844ad2d.eastus2.azurecontainerapps.io"
echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Configure custom domain"
echo "2. Set up SSL certificates"
echo "3. Configure monitoring alerts"
echo "4. Scale your empire!"

echo -e "\n🚀 The future belongs to those who build systems. You've built yours."