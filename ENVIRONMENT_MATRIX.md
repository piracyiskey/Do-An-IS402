# Environment Matrix (Dev-First Contract)

This file is the source of truth for Day 1 pipeline wiring.

## Current rollout strategy

- Configure dev completely first.
- Keep staging created but optional to leave unfilled until dev is stable.

## 1) GitHub Environments

- dev (active now)
- staging (create now, populate later)

## 2) GitHub Environment Variables (non-secret)

Add these in dev now.

| Variable name | dev value | Source |
|---|---|---|
| AZURE_SUBSCRIPTION_ID | 5ec87429-46df-43de-b3fd-01bacd43cff3 | Azure account |
| AZURE_TENANT_ID | 2dff09ac-2b3b-4182-9953-2b548e0d0b39 | Azure account |
| AZURE_CLIENT_ID | <workload-identity-app-client-id> | App registration |
| AKS_RESOURCE_GROUP | rg-esapp | Terraform output |
| AKS_CLUSTER_NAME | esapp-aks-dev | Terraform output |
| AKS_NAMESPACE | dev | Team decision |
| ACR_LOGIN_SERVER | esappdacr.azurecr.io | Terraform output |
| ACR_BACKEND_REPOSITORY | esapp-backend | Team decision |
| ACR_FRONTEND_REPOSITORY | esapp-frontend | Team decision |
| KEYVAULT_NAME | esapp-kv-dev | Terraform output |
| MYSQL_HOST | esapp-mysql-dev.mysql.database.azure.com | Terraform output |
| MYSQL_DATABASE | esapp | Terraform output |
| MYSQL_USER | azureuser | Terraform output |
| REDIS_HOST | esapp-redis-dev.redis.cache.windows.net | Terraform output |
| REDIS_PORT | 6380 | Terraform output |
| BACKEND_PUBLIC_URL | https://dev-api.<your-domain> | DNS/Ingress |
| FRONTEND_PUBLIC_URL | https://dev.<your-domain> | DNS/Ingress |
| CORS_ALLOWED_ORIGINS | https://dev.<your-domain> | DNS/Ingress |

Notes:

- Use one namespace per environment. For this plan, use dev and later staging.
- Repository names are the ACR repository paths used by container pushes.

## 3) Laravel runtime decisions for dev

- CACHE_STORE=redis
- SESSION_DRIVER=redis
- QUEUE_CONNECTION=database

## 4) Key Vault secrets required for dev runtime

Store these in esapp-kv-dev.

- APP-KEY
- JWT-SECRET
- DB-PASSWORD
- GOOGLE-CLIENT-SECRET
- REDIS-PASSWORD
- MAIL-USERNAME
- MAIL-PASSWORD
- Any private API credentials

Already confirmed in Key Vault:

- DB-HOST
- DB-NAME
- DB-PASSWORD
- DB-USER
- REDIS-HOST
- REDIS-PORT
- REDIS-PASSWORD

## 5) GitHub Environment Secrets (only when needed)

Prefer runtime secrets from Key Vault.

Only add GitHub secrets if your workflow explicitly requires them, such as:

- AZURE_CLIENT_SECRET (only if not using OIDC)
- Deployment-only tokens that cannot be fetched from Key Vault

## 6) Next actions after creating dev environment

1. Fill all dev variables from section 2.
2. Confirm all required secrets exist in Key Vault section 4.
3. Wire workflow to read dev environment variables and pull runtime secrets from Key Vault.
4. Run first dev pipeline deployment and verify app, DB, and Redis connectivity.
5. After stable dev, copy same contract to staging values.

## 7) Exit criteria (Day 1)

- [x] dev environment exists in GitHub
- [ ] dev variables populated using this contract
- [ ] required runtime secrets present in Key Vault
- [ ] first dev deployment succeeds
- [ ] staging created (values can remain pending)
