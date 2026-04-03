# RUNBOOK: Dev Cost Control (Stop/Start)

This runbook defines how to pause and resume the dev environment safely to reduce Azure cost.

Scope:
- Environment: dev only
- Subscription: 5ec87429-46df-43de-b3fd-01bacd43cff3
- Resource group: rg-esapp
- AKS cluster: esapp-aks-dev
- MySQL Flexible Server: esapp-mysql-dev
- Redis: esapp-redis-dev
- Ingress host style: nip.io (depends on current ingress public IP)

## 1) Preconditions

- You are logged in to Azure CLI with permissions for RG resources.
- You can run kubectl for the dev cluster.
- You understand that ingress IP may change after restart.

Set context:

```powershell
az account set --subscription 5ec87429-46df-43de-b3fd-01bacd43cff3
```

## 2) Stop Procedure (Cost Saving)

Recommended order:
1. Stop app traffic (AKS)
2. Stop database
3. Stop Redis if supported in your SKU

### 2.1 Stop AKS cluster

```powershell
az aks stop --resource-group rg-esapp --name esapp-aks-dev
```

Check status:

```powershell
az aks show --resource-group rg-esapp --name esapp-aks-dev --query powerState.code -o tsv
```

Expected: `Stopped`

### 2.2 Stop MySQL Flexible Server

```powershell
az mysql flexible-server stop --resource-group rg-esapp --name esapp-mysql-dev
```

Check status:

```powershell
az mysql flexible-server show --resource-group rg-esapp --name esapp-mysql-dev --query state -o tsv
```

Expected: `Stopped`

### 2.3 Redis note

Azure Cache for Redis stop/start depends on SKU/features. If stop is unavailable, leave it running and account for baseline cost.

Check current Redis state:

```powershell
az redis show --resource-group rg-esapp --name esapp-redis-dev --query provisioningState -o tsv
```

## 3) Start Procedure (Resume)

Recommended order:
1. Start MySQL
2. Start AKS
3. Re-acquire cluster credentials
4. Validate ingress IP and URLs
5. Run deploy workflow and smoke checks

### 3.1 Start MySQL Flexible Server

```powershell
az mysql flexible-server start --resource-group rg-esapp --name esapp-mysql-dev
```

Wait until ready:

```powershell
az mysql flexible-server show --resource-group rg-esapp --name esapp-mysql-dev --query state -o tsv
```

Expected: `Ready`

### 3.2 Start AKS

```powershell
az aks start --resource-group rg-esapp --name esapp-aks-dev
```

Check power state:

```powershell
az aks show --resource-group rg-esapp --name esapp-aks-dev --query powerState.code -o tsv
```

Expected: `Running`

### 3.3 Refresh kubectl context

```powershell
az aks get-credentials --resource-group rg-esapp --name esapp-aks-dev --overwrite-existing
kubectl get nodes
```

### 3.4 Check ingress public IP

```powershell
kubectl get svc ingress-nginx-controller -n ingress-nginx -o wide
kubectl get ingress -n dev -o wide
```

If external IP changed, update all URL-dependent settings.

## 4) URL Drift Handling (nip.io)

Because nip.io includes the IP in hostname, any ingress IP change requires URL updates.

Given new IP `<NEW_IP>`, compute:
- Frontend URL: `http://dev.<NEW_IP>.nip.io`
- Backend URL: `http://dev-api.<NEW_IP>.nip.io`

Update GitHub Environment vars (`dev`):
- BACKEND_PUBLIC_URL
- FRONTEND_PUBLIC_URL
- CORS_ALLOWED_ORIGINS
- GOOGLE_REDIRECT_URI

Also ensure Google OAuth Authorized Redirect URI matches the exact callback URL.

## 5) Post-Restart Validation

### 5.1 Trigger deploy workflow

Run `Deploy Dev` workflow after services are up and URLs are updated.

### 5.2 Kubernetes checks

```powershell
kubectl get pods -n dev
kubectl get deploy -n dev
kubectl get ingress -n dev -o wide
```

### 5.3 Functional smoke checks

```powershell
curl http://dev-api.<IP>.nip.io/api/health
curl -I http://dev.<IP>.nip.io/
```

### 5.4 Demo-critical checks

- Login / Google OAuth callback works
- Email verification send-code works
- Product list loads
- Add-to-cart works

## 6) Optional Snapshot Seed (On Demand)

Migrations run automatically in CI.

Snapshot seeding is optional and should be used intentionally:

Manual in-cluster seed command:

```powershell
$pod = kubectl get pods -n dev -l app=backend --field-selector=status.phase=Running -o jsonpath='{.items[0].metadata.name}'; kubectl exec -n dev $pod -c php-fpm -- sh -lc 'DB_SEED_MODE=snapshot php artisan db:seed --force'
```

Or use manual workflow dispatch with `seed_snapshot=true` if enabled in pipeline.

## 7) Known Caveats

- AKS/ingress startup can take several minutes.
- nip.io hostnames are not stable identifiers; they follow IP changes.
- OAuth may fail if redirect URI is stale after IP changes.
- Redis cost behavior depends on SKU; stop/start may not be available.

