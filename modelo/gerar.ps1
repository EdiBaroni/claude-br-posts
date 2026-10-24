# Gera os PNGs (1080x1350) de um post a partir de modelo/carrossel.html + posts/<post>/post.js.
# Uso: .\gerar.ps1 -Post "2026-10-27-novidades" -Total 10
param([string]$Post, [int]$Total)
$raiz = Split-Path $PSScriptRoot -Parent
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$uri = ([System.Uri](Join-Path $PSScriptRoot "carrossel.html")).AbsoluteUri
$dir = Join-Path $raiz "posts\$Post"
foreach ($n in 1..$Total) {
  & $chrome --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --allow-file-access-from-files `
    --user-data-dir="$env:TEMP\chrome-carrossel" --window-size=1080,1350 --virtual-time-budget=8000 `
    --screenshot="$dir\slide-$n.png" "$uri`?p=../posts/$Post/&n=$n" 2>$null | Out-Null
}
Get-ChildItem $dir -Filter "slide-*.png" | Measure-Object | ForEach-Object { "$Post`: $($_.Count) slides" }
