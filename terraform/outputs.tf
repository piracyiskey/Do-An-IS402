# Container Registry
output "acr_login_server" {
  value       = azurerm_container_registry.main.login_server
  description = "ACR login server URL"
}

output "acr_admin_username" {
  value       = azurerm_container_registry.main.admin_username
  description = "ACR admin username"
  sensitive   = true
}

output "acr_admin_password" {
  value       = azurerm_container_registry.main.admin_password
  description = "ACR admin password"
  sensitive   = true
}

# AKS
output "aks_cluster_name" {
  value       = azurerm_kubernetes_cluster.main.name
  description = "AKS cluster name"
}

output "aks_resource_group_name" {
  value       = azurerm_kubernetes_cluster.main.resource_group_name
  description = "AKS resource group"
}

output "aks_kube_config" {
  value       = azurerm_kubernetes_cluster.main.kube_config_raw
  description = "Kubernetes config"
  sensitive   = true
}

# Database
output "mysql_fqdn" {
  value       = azurerm_mysql_flexible_server.main.fqdn
  description = "MySQL FQDN"
}

output "mysql_database_name" {
  value       = azurerm_mysql_flexible_database.app.name
  description = "Database name"
}

output "mysql_admin_username" {
  value       = var.mysql_admin_username
  description = "MySQL admin username"
}

# Redis
output "redis_hostname" {
  value       = azurerm_redis_cache.main.hostname
  description = "Redis host name"
}

output "redis_ssl_port" {
  value       = azurerm_redis_cache.main.ssl_port
  description = "Redis SSL port"
}

# Key Vault
output "keyvault_name" {
  value       = azurerm_key_vault.main.name
  description = "Key Vault name"
}

output "keyvault_id" {
  value       = azurerm_key_vault.main.id
  description = "Key Vault resource ID"
}

# Log Analytics
output "log_analytics_workspace_id" {
  value       = azurerm_log_analytics_workspace.main.id
  description = "Log Analytics workspace ID"
}

# Summary
output "deployment_summary" {
  value = {
    environment          = var.environment
    region               = data.azurerm_resource_group.main.location
    resource_group       = data.azurerm_resource_group.main.name
    acr_login_server     = azurerm_container_registry.main.login_server
    aks_cluster_name     = azurerm_kubernetes_cluster.main.name
    mysql_fqdn           = azurerm_mysql_flexible_server.main.fqdn
    mysql_database_name  = azurerm_mysql_flexible_database.app.name
    redis_hostname       = azurerm_redis_cache.main.hostname
    redis_ssl_port       = azurerm_redis_cache.main.ssl_port
    keyvault_name        = azurerm_key_vault.main.name
  }
}
