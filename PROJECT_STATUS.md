# Project Status Tracker

This file is the living source of truth for delivery progress across days.

How to use this file:
- Update at the end of each work session.
- Keep each day scoped to goals, decisions, completed work, and carry-over tasks.
- Do not store secrets in this file.

---

## Day 1 - Inputs Lock and Dev Environment Wiring

Date: 2026-04-01

### Goal
Lock deployment inputs and environment contracts so pipeline wiring is deterministic.

### Scope completed
- Dev Azure infrastructure provisioned with Terraform.
- Environment contract updated to a dev-first model.
- GitHub environment dev created and populated with core non-secret variables.
- Redis added to Terraform and validated in dev.
- Key Vault contract tightened to secrets-only model.

### Key decisions (locked)
- Rollout order: dev first, staging later after dev pipeline is stable.
- Source of truth model:
  - Non-secrets: GitHub Environment Variables (and later injected to runtime config)
  - Secrets: Azure Key Vault
- Laravel runtime policy for AKS:
  - CACHE_STORE=redis
  - SESSION_DRIVER=redis
  - QUEUE_CONNECTION=database
- Non-secret DB/Redis connection metadata should not stay in Key Vault long-term.

### Terraform and infra state (dev)
Provisioned/verified:
- ACR: esappdacr.azurecr.io
- AKS: esapp-aks-dev
- Key Vault: esapp-kv-dev
- MySQL host: esapp-mysql-dev.mysql.database.azure.com
- MySQL database: esapp
- Redis host: esapp-redis-dev.redis.cache.windows.net
- Redis SSL port: 6380
- Region: southeastasia
- Resource group: rg-esapp

### GitHub dev environment status
Added variables:
- AZURE_SUBSCRIPTION_ID
- AZURE_TENANT_ID
- AZURE_CLIENT_ID
- AKS_RESOURCE_GROUP
- AKS_CLUSTER_NAME
- AKS_NAMESPACE
- ACR_LOGIN_SERVER
- ACR_BACKEND_REPOSITORY
- ACR_FRONTEND_REPOSITORY
- KEYVAULT_NAME
- MYSQL_HOST
- MYSQL_DATABASE
- MYSQL_USER
- REDIS_HOST
- REDIS_PORT

Deferred variables (pending DNS/Ingress day):
- BACKEND_PUBLIC_URL
- FRONTEND_PUBLIC_URL
- CORS_ALLOWED_ORIGINS

### Key Vault status (dev)
Confirmed present:
- APP-KEY
- JWT-SECRET
- DB-PASSWORD
- GOOGLE-CLIENT-SECRET
- REDIS-PASSWORD
- MAIL-USERNAME
- MAIL-PASSWORD

Notes:
- Terraform configuration was updated to remove non-secret Key Vault entries (DB-HOST, DB-NAME, DB-USER, REDIS-HOST, REDIS-PORT).
- Cleanup apply completed successfully.

### Problems encountered and resolved
- Azure SKU incompatibilities in region were resolved by changing AKS and MySQL SKUs.
- Redis creation latency was long but completed successfully.
- MySQL zone drift caused apply failure; resolved via lifecycle ignore on zone.
- AKS node pool drift on upgrade settings resolved by pinning values.

### Day 1 exit criteria
- [x] dev environment exists in GitHub
- [x] core dev variables populated
- [x] required runtime secrets present in Key Vault (current scope)
- [x] Terraform plan/apply stable for dev baseline
- [ ] first dev app deployment succeeds
- [ ] staging environment values populated

### Carry-over to next sessions
1. DNS and ingress setup for public URLs.
2. Populate deferred dev vars:
   - BACKEND_PUBLIC_URL
   - FRONTEND_PUBLIC_URL
   - CORS_ALLOWED_ORIGINS
3. Wire CI/CD workflow to:
   - Use GitHub dev environment variables
   - Pull runtime secrets from Key Vault
   - Deploy backend/frontend to AKS
4. Run first end-to-end dev deployment and smoke tests.
5. Clone contract to staging after dev is green.

---

## Session Update Template (copy for Day 2+)

## Day X - <Title>

Date: YYYY-MM-DD

### Goal
- 

### Completed
- 

### Decisions
- 

### Issues and fixes
- Issue:
- Fix:

### Exit criteria
- [ ] 
- [ ] 

### Carry-over
1. 
2. 
3. 
