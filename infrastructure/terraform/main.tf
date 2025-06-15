terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# Resource Group
resource "azurerm_resource_group" "empire" {
  name     = "automation-empire-rg"
  location = "East US 2"
  
  tags = {
    Environment = "Production"
    Project     = "AutomationEmpire"
  }
}

# Storage Account
resource "azurerm_storage_account" "empire" {
  name                     = "automationempire${random_string.storage_suffix.result}"
  resource_group_name      = azurerm_resource_group.empire.name
  location                 = azurerm_resource_group.empire.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  blob_properties {
    cors_rule {
      allowed_headers    = ["*"]
      allowed_methods    = ["GET", "HEAD", "POST", "PUT", "DELETE"]
      allowed_origins    = ["*"]
      exposed_headers    = ["*"]
      max_age_in_seconds = 3600
    }
  }
}

# Container Registry
resource "azurerm_container_registry" "empire" {
  name                = "automationempireacr${random_string.acr_suffix.result}"
  resource_group_name = azurerm_resource_group.empire.name
  location            = azurerm_resource_group.empire.location
  sku                 = "Basic"
  admin_enabled       = true
}

# Log Analytics Workspace
resource "azurerm_log_analytics_workspace" "empire" {
  name                = "empire-logs"
  location            = azurerm_resource_group.empire.location
  resource_group_name = azurerm_resource_group.empire.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

# Container Apps Environment
resource "azurerm_container_app_environment" "empire" {
  name                       = "automation-empire-env"
  location                   = azurerm_resource_group.empire.location
  resource_group_name        = azurerm_resource_group.empire.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.empire.id
}

# Random strings for unique names
resource "random_string" "storage_suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "random_string" "acr_suffix" {
  length  = 8
  special = false
  upper   = false
}

# Outputs
output "resource_group_name" {
  value = azurerm_resource_group.empire.name
}

output "storage_account_name" {
  value = azurerm_storage_account.empire.name
}

output "container_registry_login_server" {
  value = azurerm_container_registry.empire.login_server
}

output "container_apps_environment_id" {
  value = azurerm_container_app_environment.empire.id
}