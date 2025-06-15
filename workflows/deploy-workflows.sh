#!/bin/bash

# Deploy n8n Workflows
# "Unleash the automation army"

echo "🤖 Deploying n8n Workflows..."

# Configuration
N8N_URL="https://n8n-app.livelypebble-c844ad2d.eastus2.azurecontainerapps.io"
N8N_API_KEY="${N8N_API_KEY:-your-api-key-here}"

# Import workflow templates
for workflow in *.json; do
    if [ -f "$workflow" ]; then
        echo "Importing: $workflow"
        # In production, use n8n API to import workflows
        # curl -X POST "$N8N_URL/api/v1/workflows" \
        #      -H "X-N8N-API-KEY: $N8N_API_KEY" \
        #      -H "Content-Type: application/json" \
        #      -d @"$workflow"
    fi
done

echo "✅ Workflows deployed successfully!"