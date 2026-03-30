variable "resource_group_name" {
  description = "Name of the resource group (must already exist)"
  type        = string
  default     = "rg-esapp"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "southeastasia"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "esapp"
}

variable "environment" {
  description = "Environment name (dev, staging)"
  type        = string
  validation {
    condition     = contains(["dev", "staging"], var.environment)
    error_message = "Environment must be 'dev' or 'staging'."
  }
}

# Networking
variable "vnet_cidr" {
  description = "CIDR block for virtual network"
  type        = string
  default     = "10.0.0.0/16"
}

variable "aks_subnet_cidr" {
  description = "CIDR block for AKS subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "db_subnet_cidr" {
  description = "CIDR block for database subnet"
  type        = string
  default     = "10.0.2.0/24"
}

# AKS
variable "aks_kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.27"
}

variable "aks_node_count" {
  description = "Number of AKS nodes"
  type        = number
  default     = 3
}

variable "aks_vm_size" {
  description = "VM size for AKS nodes"
  type        = string
  default     = "Standard_B2s_v2"
}

# Database
variable "mysql_version" {
  description = "MySQL version"
  type        = string
  default     = "8.0.21"
}

variable "mysql_admin_username" {
  description = "MySQL admin username"
  type        = string
  default     = "azureuser"
}

variable "mysql_admin_password" {
  description = "MySQL admin password (will be stored in Key Vault)"
  type        = string
  sensitive   = true
}

variable "mysql_sku_name" {
  description = "MySQL SKU"
  type        = string
  default     = "GP_Standard_D2ds_v4"
}

variable "mysql_allocated_storage" {
  description = "Storage allocated in GB"
  type        = number
  default     = 20
}

# ACR
variable "acr_sku" {
  description = "ACR tier"
  type        = string
  default     = "Basic"
}

# Redis
variable "redis_sku_name" {
  description = "Redis SKU name (Basic, Standard, Premium)"
  type        = string
  default     = "Basic"
}

variable "redis_family" {
  description = "Redis family (C for Basic/Standard, P for Premium)"
  type        = string
  default     = "C"
}

variable "redis_capacity" {
  description = "Redis capacity (0 for C0 on Basic tier)"
  type        = number
  default     = 0
}

variable "redis_enable_non_ssl_port" {
  description = "Whether to enable non-SSL port 6379"
  type        = bool
  default     = false
}

# Key Vault
variable "keyvault_sku" {
  description = "Key Vault SKU"
  type        = string
  default     = "standard"
}
