# Recorta as telas de um post a partir dos prints.
# Uso: .\recortar.ps1 -Origem "C:\Insta Anthropic\01" -Post "..\posts\2026-10-27-novidades" -Lista "nome,arquivo,x,y,largura,altura;..."
# "arquivo" e o horario do print (ex.: 132023 para "Captura de tela 2026-10-24 132023.png").
param([string]$Origem, [string]$Post, [string]$Lista)
Add-Type -AssemblyName System.Drawing
$saida = Join-Path $Post "telas"
New-Item -ItemType Directory -Force $saida | Out-Null
foreach ($item in $Lista.Split(';')) {
  if (-not $item.Trim()) { continue }
  $p = $item.Split(',') | ForEach-Object { $_.Trim() }
  $arq = Get-ChildItem -LiteralPath $Origem -Filter "*$($p[1]).png" | Select-Object -First 1
  $img = [System.Drawing.Bitmap]::FromFile($arq.FullName)
  $x = [int]$p[2]; $y = [int]$p[3]
  $w = [Math]::Min([int]$p[4], $img.Width - $x); $h = [Math]::Min([int]$p[5], $img.Height - $y)
  $parte = $img.Clone((New-Object System.Drawing.Rectangle $x, $y, $w, $h), $img.PixelFormat)
  $parte.Save((Join-Path $saida "$($p[0]).png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $parte.Dispose(); $img.Dispose()
  "$($p[0]): ${w}x${h}"
}
