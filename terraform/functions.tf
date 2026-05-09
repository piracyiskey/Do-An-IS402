# ─────────────────────────────────────────────────────────────
# Azure Functions — Serverless Email Sender
# ─────────────────────────────────────────────────────────────

# Storage account required by Azure Functions for internal state
resource "azurerm_storage_account" "functions" {
  name                     = "${var.project_name}funcsa${var.environment}"
  resource_group_name      = data.azurerm_resource_group.main.name
  location                 = data.azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = local.common_tags
}

# Consumption plan — pay-per-execution, zero cost when idle
resource "azurerm_service_plan" "functions" {
  name                = "${var.project_name}-func-plan-${var.environment}"
  resource_group_name = data.azurerm_resource_group.main.name
  location            = data.azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = "Y1" # Y1 = Consumption (serverless)

  tags = local.common_tags
}

# The Function App itself
resource "azurerm_linux_function_app" "email" {
  name                = "${var.project_name}-func-email-${var.environment}"
  resource_group_name = data.azurerm_resource_group.main.name
  location            = data.azurerm_resource_group.main.location

  storage_account_name       = azurerm_storage_account.functions.name
  storage_account_access_key = azurerm_storage_account.functions.primary_access_key
  service_plan_id            = azurerm_service_plan.functions.id

  site_config {
    application_stack {
      node_version = "20"
    }
  }

  app_settings = {
    # SMTP configuration for sending emails
    MAIL_HOST         = var.function_mail_host
    MAIL_PORT         = var.function_mail_port
    MAIL_USERNAME     = var.function_mail_username
    MAIL_PASSWORD     = var.function_mail_password
    MAIL_FROM_ADDRESS = var.function_mail_from_address

    # Azure Functions runtime settings
    FUNCTIONS_WORKER_RUNTIME       = "node"
    WEBSITE_NODE_DEFAULT_VERSION   = "~20"
  }

  tags = local.common_tags
}
