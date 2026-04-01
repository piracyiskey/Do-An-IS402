param(
    [Parameter(Mandatory = $false)]
    [string]$VaultName = "kv-esapp-local",

    [Parameter(Mandatory = $false)]
    [string]$OutputFile = ".secrets.local.env"
)

$ErrorActionPreference = "Stop"

if (Get-Variable PSNativeCommandUseErrorActionPreference -ErrorAction SilentlyContinue) {
    $PSNativeCommandUseErrorActionPreference = $false
}

function Get-SecretValue {
    param(
        [string]$KeyVault,
        [string]$SecretName,
        [switch]$Optional
    )

    try {
        $value = az keyvault secret show --vault-name $KeyVault --name $SecretName --query value -o tsv --only-show-errors 2>$null
        if (-not $value -and -not $Optional) {
            throw "Secret '$SecretName' is empty in vault '$KeyVault'."
        }
        return $value
    }
    catch {
        if ($Optional) {
            return ""
        }
        throw "Unable to read secret '$SecretName' from vault '$KeyVault'. $_"
    }
}

if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
    throw "Azure CLI is not installed. Install it first: https://aka.ms/installazurecliwindows"
}

$null = az account show --output none --only-show-errors 2>$null
if ($LASTEXITCODE -ne 0) {
    throw "You are not logged in. Run: az login"
}

$secrets = @{
    APP_KEY             = Get-SecretValue -KeyVault $VaultName -SecretName "APP-KEY"
    DB_PASSWORD         = Get-SecretValue -KeyVault $VaultName -SecretName "DB-PASSWORD"
    MYSQL_ROOT_PASSWORD = Get-SecretValue -KeyVault $VaultName -SecretName "MYSQL-ROOT-PASSWORD"
    JWT_SECRET          = Get-SecretValue -KeyVault $VaultName -SecretName "JWT-SECRET"

    GOOGLE_CLIENT_ID     = Get-SecretValue -KeyVault $VaultName -SecretName "GOOGLE-CLIENT-ID" -Optional
    GOOGLE_CLIENT_SECRET = Get-SecretValue -KeyVault $VaultName -SecretName "GOOGLE-CLIENT-SECRET" -Optional
    GOOGLE_REDIRECT_URI  = Get-SecretValue -KeyVault $VaultName -SecretName "GOOGLE-REDIRECT-URI" -Optional
}

if (-not $secrets.GOOGLE_CLIENT_ID) {
    $secrets.GOOGLE_CLIENT_ID = "your-google-client-id.apps.googleusercontent.com"
}
if (-not $secrets.GOOGLE_REDIRECT_URI) {
    $secrets.GOOGLE_REDIRECT_URI = "http://localhost:5173/auth/callback"
}

$lines = @(
    "APP_KEY=$($secrets.APP_KEY)",
    "DB_PASSWORD=$($secrets.DB_PASSWORD)",
    "MYSQL_ROOT_PASSWORD=$($secrets.MYSQL_ROOT_PASSWORD)",
    "JWT_SECRET=$($secrets.JWT_SECRET)",
    "GOOGLE_CLIENT_ID=$($secrets.GOOGLE_CLIENT_ID)",
    "GOOGLE_CLIENT_SECRET=$($secrets.GOOGLE_CLIENT_SECRET)",
    "GOOGLE_REDIRECT_URI=$($secrets.GOOGLE_REDIRECT_URI)"
)

Set-Content -Path $OutputFile -Value $lines -Encoding UTF8
Write-Host "Wrote secrets file: $OutputFile"
Write-Host "Next: docker compose --env-file $OutputFile up -d --build"
