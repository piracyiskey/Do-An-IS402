# Terraform: Day 2 Infrastructure

Provisions Azure resources for demo: ACR, AKS, MySQL database, Redis cache, Key Vault, Log Analytics.

All resources go into a single resource group (`rg-esapp`) with minimal security for demo purposes.

## Prerequisites

- Terraform >= 1.0
- Azure CLI (`az`) logged in
- An existing Azure resource group named `rg-esapp`
- Subscription with quota for AKS + MySQL + Redis

## Quick start

### 1. Copy example variables

```powershell
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
```

### 2. Edit terraform.tfvars

Update these values:
- `mysql_admin_password` - secure, random password
- `environment` - "dev" or "staging"
- `location` - prefer "southeastasia" or your choice
- Sizing if needed (aks_vm_size, mysql_sku_name)

### 3. Plan and apply

```powershell
cd terraform

# Validate syntax
terraform init
terraform validate

# Preview changes
terraform plan -lock=false -out=tfplan

# Apply
terraform apply tfplan
```

Resources are created. This takes ~10-20 minutes.

### 4. Capture outputs

After apply succeeds, get deployment values:

```powershell
terraform output deployment_summary
```

Or individual values:

```powershell
terraform output acr_login_server
terraform output aks_cluster_name
terraform output mysql_fqdn
terraform output redis_hostname
terraform output keyvault_name
```

### 5. Configure Azure CLI and kubectl

```powershell
# Get AKS credentials
az aks get-credentials `
  --resource-group rg-esapp `
  --name esapp-aks-dev

# Verify K8s connection
kubectl get nodes
```

## Outputs for CI/CD

These Terraform outputs are needed for GitHub Actions pipelines:

- `acr_login_server` - push/pull container images
- `aks_cluster_name` - deploy to this cluster
- `mysql_fqdn` - database host for connection strings
- `redis_hostname` - cache host for session/cache queue usage
- `keyvault_name` - retrieve app secrets at runtime

## Environment-specific states

For dev and staging, run apply once per environment with different `terraform.tfvars`:

```powershell
# Dev
terraform apply -var environment=dev

# Staging
terraform apply -var environment=staging
```

Each will create separate resources (different names, separate DB, separate Key Vault).

## State management

Currently uses local state (`.terraform/` directory).

For team/CI production use, configure remote backend:

Edit `main.tf` and uncomment the `backend "azurerm"` block, then:

```powershell
terraform init
```

## Cleanup

Destroy all resources (costs stop):

```powershell
terraform destroy
```

## Troubleshooting

**Error: Resource group not found**
- Ensure `rg-esapp` exists in your subscription
- Update `terraform.tfvars` if group name is different

**Error: Insufficient quota**
- Check subscription quotas for vCPU, IPs, etc.
- Reduce `aks_node_count` or use smaller `aks_vm_size`

**AKS creation very slow**
- Normal. First AKS cluster can take 15+ minutes.

**MySQL connection timeout**
- Firewall rule is very permissive (`0.0.0.0/0`) for demo
- If still failing, check Key Vault has correct values stored

**Redis connection error**
- Use TLS port (`6380`) with password auth
- Check Key Vault secret `REDIS-PASSWORD` and runtime vars `REDIS_HOST` / `REDIS_PORT`
