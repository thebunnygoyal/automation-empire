variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "eastus2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "automation-empire"
}

variable "n8n_url" {
  description = "n8n instance URL"
  type        = string
  default     = "https://n8n-app.livelypebble-c844ad2d.eastus2.azurecontainerapps.io"
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default = {
    Project     = "AutomationEmpire"
    ManagedBy   = "Terraform"
    Environment = "Production"
  }
}