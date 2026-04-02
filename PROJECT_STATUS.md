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
- Fixed frontend CI build failure on Linux runner:
  - corrected case-sensitive import in frontend app (`Career` -> `career.jsx`)
- Fixed Azure OIDC bootstrap:
  - added federated credential for GitHub Environment subject `repo:piracyiskey/Do-An-IS402:environment:dev`
  - granted required RBAC/policies for pipeline service principal (subscription read, ACR push, AKS access, Key Vault secret read)
- Fixed deployment workflow issues discovered in first pipeline runs:
  - made ACR attach step best-effort to avoid hard failure when owner-level permission is unavailable
  - excluded migration Job from `deploy_dev` apply set (immutable Job template conflict)
  - added richer rollout diagnostics (describe/logs on timeout)
  - changed backend readiness/liveness probes to `/up` for rollout stability
- Milestone reached:
  - `Deploy to AKS (dev)` job now passes in GitHub Actions.
- Recovery validation completed (manual in-cluster):
  - `backend-secrets` resynced from Key Vault (placeholder overwrite removed)
  - migration Job completed successfully
  - backend `/api/health` and frontend `/` smoke checks returned HTTP 200
- DNS/Ingress progress (dev):
  - installed `ingress-nginx` controller in AKS
  - assigned public load balancer IP `20.247.224.41`
  - updated ingress hosts to temporary public `nip.io` domains
  - validated external routing: frontend `/` = 200, backend `/api/health` = 200

### Current risks / watch items
- Root cause identified for DB auth regression: deploy step reapplied `01-secret-backend.template.yaml`, overwriting `backend-secrets` with `__FROM_KEYVAULT_*` placeholders.
- Azure MySQL enforces secure transport; runtime now needs `MYSQL_ATTR_SSL_CA` in backend env for migrations and app DB checks.
- Temporary `nip.io` domains are tied to current load balancer IP; if ingress IP changes, URLs must be updated.

### Exit criteria
- [x] Workflow skeleton created with correct trigger
- [x] Job chain implemented for quality, build, deploy, migrate, smoke
- [x] Build and push images succeed in pipeline
- [x] Deploy to AKS (dev) succeeds in pipeline
- [x] Migration succeeds with repaired secret + TLS config (manually validated in-cluster)
- [x] Migration job succeeds in GitHub Actions after workflow fix merge
- [x] Internal in-cluster smoke checks pass (manual validation)
- [x] Smoke checks pass in GitHub Actions (`smoke_dev`) and optional external checks
- [x] First push to `dev` completes full end-to-end successfully

### Carry-over
1. Set GitHub `dev` environment variables for public checks:
  - `BACKEND_PUBLIC_URL=http://dev-api.20.247.224.41.nip.io`
  - `FRONTEND_PUBLIC_URL=http://dev.20.247.224.41.nip.io`
  - `CORS_ALLOWED_ORIGINS=http://dev.20.247.224.41.nip.io`
2. Trigger one `deploy-dev` workflow run to confirm external smoke checks execute against public URLs.
3. Start staging environment setup using the same pipeline and config contract.
