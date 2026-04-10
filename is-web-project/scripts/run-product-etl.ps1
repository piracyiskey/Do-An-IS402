param(
    [ValidateSet('dry-run', 'import')]
    [string]$Mode = 'dry-run',
    [string]$CsvFile = 'database/etl/products.sample.csv',
    [string]$VaultName = 'esapp-kv-dev',
    [string]$DbHost = 'esapp-mysql-dev.mysql.database.azure.com',
    [string]$DbPort = '3306',
    [string]$DbName = 'esapp',
    [string]$DbUser = 'azureuser'
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

# Resolve a CA bundle path for MySQL TLS.
$candidates = @(
    'C:\Program Files\Git\usr\ssl\certs\ca-bundle.crt',
    'C:\Program Files\Git\mingw64\ssl\certs\ca-bundle.crt',
    'C:\Windows\System32\curl-ca-bundle.crt',
    'C:\xampp\php\extras\ssl\cacert.pem'
)

$sslCa = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $sslCa) {
    throw "No CA bundle file found. Update candidates in scripts/run-product-etl.ps1."
}

# Pull DB password securely from Key Vault.
$dbPassword = az keyvault secret show --vault-name $VaultName --name DB-PASSWORD --query value -o tsv
if (-not $dbPassword) {
    throw "Could not read DB-PASSWORD from Key Vault '$VaultName'. Ensure 'az login' and access permissions are valid."
}

$env:DB_CONNECTION = 'mysql'
$env:DB_HOST = $DbHost
$env:DB_PORT = $DbPort
$env:DB_DATABASE = $DbName
$env:DB_USERNAME = $DbUser
$env:DB_PASSWORD = $dbPassword
$env:MYSQL_ATTR_SSL_CA = $sslCa

$command = @('artisan', 'etl:import-products', "--file=$CsvFile")
if ($Mode -eq 'dry-run') {
    $command += '--dry-run'
}

Write-Host "Mode: $Mode"
Write-Host "CSV : $CsvFile"
Write-Host "Host: $DbHost"
Write-Host "TLS : $sslCa"
Write-Host "Running: php $($command -join ' ')"

php @command
