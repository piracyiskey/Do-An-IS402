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

## Day 2 - Kubernetes Runtime Manifests (Dev)

Date: 2026-04-01

### Goal
- Prepare Kubernetes runtime manifests so AKS can run backend/frontend with clean config and secret injection.

### Completed
- Created dev manifest set in k8s/dev:
  - namespace
  - backend ConfigMap
  - backend secret template
  - backend nginx config ConfigMap
  - backend Deployment + Service
  - frontend Deployment + Service
  - ingress
  - migration Job template (suspended)
- Added usage notes and apply order in k8s/dev/README.md.
- Applied manifests to AKS successfully (`kubectl apply -f k8s/dev/`).
- Verified resources exist in namespace `dev` (deployments, services, ingress, configmaps, secret, migration job).

### Notes
- Backend probe path is /api/health.
- Migration is a separate pipeline concern via Job template, not app startup.
- Current `kubectl` context is `esapp-aks-dev`.
- Workloads are not ready yet because image tags are placeholders (`IMAGE_TAG`) and AKS has no pull auth to ACR (ImagePullBackOff / 401 Unauthorized).

### Day 2 exit criteria
- [x] `k8s/dev` manifests created for namespace, backend, frontend, ingress, and migration job
- [x] Runtime config model defined (ConfigMap for non-secret, Secret for sensitive)
- [x] Manifests applied to dev AKS namespace
- [ ] Backend and frontend pods running successfully
- [ ] Health probe passing on backend `/api/health`

### Next
1. Wire pipeline substitutions:
   - IMAGE_TAG
   - backend secret values from Key Vault
2. Grant AKS pull access to ACR (or use imagePullSecret) before rollout.
3. Build and push backend/frontend images with real tags.
4. Update ingress hosts and URL env values after DNS/Ingress task.

---

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

---

## Day 3 - Dev GitHub Actions Pipeline

Date: 2026-04-02

### Goal
- Build a branch-triggered dev deployment workflow that runs quality gate, build/push, deploy, migration, and smoke checks.

### Completed
- Created `.github/workflows/deploy-dev.yml` with triggers:
  - push on `dev`
  - optional `workflow_dispatch`
- Implemented `quality_gate` job:
  - checkout
  - Node 22 setup
  - PHP 8.3 + Composer setup
  - dependency installation
  - `npm run predeploy:gate`
- Implemented `build_push_images` job:
  - Azure OIDC login
  - ACR login
  - backend/frontend Docker build and push
  - commit SHA image tag outputs
- Implemented `deploy_dev` job:
  - AKS context setup
  - Key Vault secret fetch and `backend-secrets` upsert
  - manifest render with SHA tag and namespace replacement
  - rollout wait for backend/frontend
- Implemented `migrate_dev` job:
  - controlled migration Job execution from template
- Implemented `smoke_dev` job:
  - in-cluster backend and frontend smoke checks
  - optional external URL checks when URL vars are available

### Current risks / watch items
- AKS must have pull rights to ACR (`az aks update --attach-acr ...`) before first successful rollout.
- External smoke checks will be skipped until DNS/Ingress URLs are finalized.
- Migration job assumes backend image contains `php artisan` runtime and correct env bindings.

### Exit criteria
- [x] Workflow skeleton created with correct trigger
- [x] Job chain implemented for quality, build, deploy, migrate, smoke
- [ ] First push to `dev` completes end-to-end successfully
- [ ] Deployed app and smoke checks pass consistently

### Carry-over
1. Run first real pipeline on `dev` branch and collect logs.
2. Fix any first-run issues (auth, image pull, rollout, migration, smoke).
3. Finalize DNS/Ingress URLs and enable public smoke checks.
