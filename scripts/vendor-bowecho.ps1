param(
  [string]$Version = "v0.1.0"
)

$ErrorActionPreference = "Stop"
$Repository = "FahrenheitResearch/bowecho-radar-toolbox"
$Asset = "bowecho-user-side-radar.zip"
$Url = "https://github.com/$Repository/releases/download/$Version/$Asset"
$H5WasmVersion = if ($env:H5WASM_VERSION) { $env:H5WASM_VERSION } else { "0.10.3" }
$H5WasmAsset = "h5wasm-$H5WasmVersion.tgz"
$H5WasmUrl = "https://registry.npmjs.org/h5wasm/-/$H5WasmAsset"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$VendorDir = Join-Path $Root "vendor"
$TempDir = Join-Path ([System.IO.Path]::GetTempPath()) ("meowdar-radar-" + [guid]::NewGuid().ToString("N"))
$Archive = Join-Path $TempDir $Asset
$Unpacked = Join-Path $TempDir "unpacked"
$H5Archive = Join-Path $TempDir $H5WasmAsset
$H5Unpacked = Join-Path $TempDir "h5wasm"

try {
  New-Item -ItemType Directory -Force -Path $TempDir, $Unpacked, $H5Unpacked, $VendorDir | Out-Null
  Write-Host "Downloading BowEcho radar toolbox $Version..."
  Invoke-WebRequest -Uri $Url -OutFile $Archive
  Expand-Archive -Path $Archive -DestinationPath $Unpacked -Force

  $Entrypoint = Get-ChildItem -Path $Unpacked -Recurse -File -Filter "radar-toolbox.js" | Select-Object -First 1
  if (-not $Entrypoint) {
    throw "Could not find radar-toolbox.js in the release archive."
  }

  Get-ChildItem -Path $VendorDir -Force | Where-Object { $_.Name -ne "INSTALL-BOWECHO.txt" } | Remove-Item -Recurse -Force
  Get-ChildItem -Path $Entrypoint.Directory.FullName -Force | Copy-Item -Destination $VendorDir -Recurse -Force

  Write-Host "Downloading h5wasm $H5WasmVersion for optional client-side GLM decoding..."
  Invoke-WebRequest -Uri $H5WasmUrl -OutFile $H5Archive
  & tar -xzf $H5Archive -C $H5Unpacked
  if ($LASTEXITCODE -ne 0) { throw "Could not unpack h5wasm." }
  $H5Target = Join-Path $VendorDir "h5wasm"
  New-Item -ItemType Directory -Force -Path $H5Target | Out-Null
  Get-ChildItem -Path (Join-Path $H5Unpacked "package/dist/esm") -Force | Copy-Item -Destination $H5Target -Recurse -Force
  $H5License = Join-Path $H5Unpacked "package/LICENSE.txt"
  if (Test-Path $H5License) { Copy-Item $H5License (Join-Path $H5Target "LICENSE.txt") -Force }
  Set-Content -Path (Join-Path $H5Target "H5WASM_VERSION") -Value $H5WasmVersion -NoNewline

  foreach ($LicenseName in @("LICENSE-MIT", "LICENSE-APACHE")) {
    $License = Get-ChildItem -Path $Unpacked -Recurse -File -Filter $LicenseName | Select-Object -First 1
    if ($License) { Copy-Item $License.FullName (Join-Path $VendorDir $LicenseName) -Force }
  }

  $Required = @(
    "radar-toolbox.js",
    "worker.js",
    "pkg/bowecho_client_wasm.js",
    "pkg/bowecho_client_wasm_bg.wasm",
    "h5wasm/hdf5_hl.js",
    "h5wasm/hdf5_util.js"
  )
  foreach ($RelativePath in $Required) {
    if (-not (Test-Path (Join-Path $VendorDir $RelativePath))) {
      throw "Vendor install is incomplete; missing $RelativePath."
    }
  }

  $H5WasmFile = Get-ChildItem -Path (Join-Path $VendorDir "h5wasm") -File -Filter "*.wasm" | Select-Object -First 1
  $H5EmbeddedWasm = Test-Path (Join-Path $VendorDir "h5wasm/hdf5_util.js")
  if (-not $H5WasmFile -and -not $H5EmbeddedWasm) {
    throw "Vendor install is incomplete; h5wasm WebAssembly payload is missing."
  }

  Set-Content -Path (Join-Path $VendorDir "BOWECHO_VERSION") -Value $Version -NoNewline
  Write-Host "BowEcho installed in $VendorDir"
  Write-Host "Next: cd `"$Root`"; python -m http.server 8790"
}
finally {
  if (Test-Path $TempDir) { Remove-Item $TempDir -Recurse -Force }
}
