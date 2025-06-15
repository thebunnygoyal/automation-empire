#!/bin/bash

# Automation Empire - Real-time Monitoring
# "Watch your empire grow in real-time"

echo "📊 AUTOMATION EMPIRE - LIVE MONITORING"
echo "====================================="

# Configuration
RESOURCE_GROUP="automation-empire-rg"
APP_NAME="automation-empire-website"
N8N_URL="https://n8n-app.livelypebble-c844ad2d.eastus2.azurecontainerapps.io"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

while true; do
    clear
    echo "📊 AUTOMATION EMPIRE - LIVE MONITORING"
    echo "====================================="
    echo "Time: $(date)"
    echo ""
    
    # Check Container App Status
    echo -e "${YELLOW}🌐 Website Status:${NC}"
    APP_STATUS=$(az containerapp show \
        --name $APP_NAME \
        --resource-group $RESOURCE_GROUP \
        --query properties.runningStatus \
        --output tsv 2>/dev/null || echo "Unknown")
    
    if [ "$APP_STATUS" == "Running" ]; then
        echo -e "  Status: ${GREEN}● Running${NC}"
    else
        echo -e "  Status: ${RED}● $APP_STATUS${NC}"
    fi
    
    # Get replicas
    REPLICAS=$(az containerapp revision list \
        --name $APP_NAME \
        --resource-group $RESOURCE_GROUP \
        --query "[0].properties.replicas" \
        --output tsv 2>/dev/null || echo "0")
    echo "  Active Replicas: $REPLICAS"
    
    # Check n8n health
    echo -e "\n${YELLOW}🤖 n8n Status:${NC}"
    N8N_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" $N8N_URL/healthz || echo "000")
    if [ "$N8N_HEALTH" == "200" ]; then
        echo -e "  Status: ${GREEN}● Healthy${NC}"
    else
        echo -e "  Status: ${RED}● Unhealthy (HTTP $N8N_HEALTH)${NC}"
    fi
    
    # Resource usage
    echo -e "\n${YELLOW}📈 Resource Usage:${NC}"
    echo "  Fetching metrics..."
    
    # Add more monitoring as needed
    
    echo -e "\n${YELLOW}Press Ctrl+C to exit${NC}"
    sleep 30
done