terraform {
  required_version = ">= 1.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }

  # Uncomment to use remote backend (Azure Storage)
  # backend "azurerm" {
  #   resource_group_name  = "rg-terraform"
  #   storage_account_name = "tfstate"
  #   container_name       = "state"
  #   key                  = "esapp.tfstate"
  # }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = true
    }
  }
}

# Reference existing resource group
data "azurerm_resource_group" "main" {
  name = var.resource_group_name
}

locals {
  env_short = substr(var.environment, 0, 1)
  common_tags = {
    environment = var.environment
    project     = var.project_name
    created_by  = "terraform"
  }
}
