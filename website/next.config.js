/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  env: {
    N8N_API_URL: process.env.N8N_API_URL || 'https://n8n-app.livelypebble-c844ad2d.eastus2.azurecontainerapps.io',
    AZURE_STORAGE_URL: process.env.AZURE_STORAGE_URL,
  },
}

module.exports = nextConfig