resource "azurerm_mysql_flexible_server" "main" {
  name                   = "${var.project_name}-mysql-${var.environment}"
  resource_group_name    = data.azurerm_resource_group.main.name
  location               = data.azurerm_resource_group.main.location
  administrator_login    = var.mysql_admin_username
  administrator_password = var.mysql_admin_password
  sku_name               = var.mysql_sku_name
  version                = var.mysql_version

  # Zone can be auto-selected by Azure and is immutable afterward.
  lifecycle {
    ignore_changes = [zone]
  }

  storage {
    size_gb = var.mysql_allocated_storage
  }

  tags = local.common_tags
}

# Database for the app
resource "azurerm_mysql_flexible_database" "app" {
  name                = "esapp"
  resource_group_name = data.azurerm_resource_group.main.name
  server_name         = azurerm_mysql_flexible_server.main.name
  charset             = "utf8mb4"
  collation           = "utf8mb4_unicode_ci"
}

# Firewall rule to allow connections from AKS
resource "azurerm_mysql_flexible_server_firewall_rule" "allow_aks" {
  name                = "allow-aks"
  resource_group_name = data.azurerm_resource_group.main.name
  server_name         = azurerm_mysql_flexible_server.main.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "255.255.255.255"
}

# Allow all Azure services (simple, non-production)
resource "azurerm_mysql_flexible_server_firewall_rule" "allow_azure" {
  name                = "allow-azure-services"
  resource_group_name = data.azurerm_resource_group.main.name
  server_name         = azurerm_mysql_flexible_server.main.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}
