resource "azurerm_container_registry" "main" {
  name                = "${var.project_name}${substr(var.environment, 0, 1)}acr"
  resource_group_name = data.azurerm_resource_group.main.name
  location            = data.azurerm_resource_group.main.location
  sku                 = var.acr_sku
  admin_enabled       = true

  tags = local.common_tags
}
