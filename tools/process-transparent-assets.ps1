param(
  [Parameter(Mandatory=$true)]
  [string]$SourceDir,

  [Parameter(Mandatory=$true)]
  [string]$OutputDir,

  [string]$Prefix = "",

  [int]$MaxParallel = 6,

  [switch]$Preview
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies "System.Drawing.dll" -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;

public static class TransparentAssetProcessor {
  static bool IsChecker(Color c) {
    return Math.Abs(c.R - c.G) < 4 && Math.Abs(c.G - c.B) < 4 && c.R >= 220 && c.R <= 248;
  }

  static bool IsSoftWhite(Color c) {
    return c.R > 238 && c.G > 238 && c.B > 238;
  }

  static int Dist(Color a, Color b) {
    int dr = a.R - b.R, dg = a.G - b.G, db = a.B - b.B;
    return dr * dr + dg * dg + db * db;
  }

  public static void ProcessOne(string src, string dst) {
    using (Bitmap input = new Bitmap(src))
    using (Bitmap output = new Bitmap(input.Width, input.Height, PixelFormat.Format32bppArgb)) {
      Color c1 = input.GetPixel(0, 0);
      Color c2 = input.GetPixel(input.Width - 1, 0);
      Color c3 = input.GetPixel(0, input.Height - 1);
      Color c4 = input.GetPixel(input.Width - 1, input.Height - 1);

      for (int y = 0; y < input.Height; y++) {
        for (int x = 0; x < input.Width; x++) {
          Color p = input.GetPixel(x, y);
          bool remove =
            p.A < 12 ||
            IsChecker(p) ||
            IsSoftWhite(p) ||
            Dist(p, c1) < 95 || Dist(p, c2) < 95 || Dist(p, c3) < 95 || Dist(p, c4) < 95;

          if (remove) output.SetPixel(x, y, Color.FromArgb(0, p.R, p.G, p.B));
          else output.SetPixel(x, y, Color.FromArgb(p.A, p.R, p.G, p.B));
        }
      }
      Directory.CreateDirectory(Path.GetDirectoryName(dst));
      output.Save(dst, ImageFormat.Png);
    }
  }

  public static void ProcessBatch(string[] sources, string[] outputs, int maxParallel) {
    ParallelOptions options = new ParallelOptions();
    options.MaxDegreeOfParallelism = Math.Max(1, maxParallel);
    Parallel.For(0, sources.Length, options, i => ProcessOne(sources[i], outputs[i]));
  }
}
"@

function New-PreviewSheet {
  param([string[]]$Files, [string]$OutPath)

  if($Files.Count -eq 0){ return }
  $thumb = 180
  $cols = [Math]::Min(5, [Math]::Max(1, $Files.Count))
  $rows = [Math]::Ceiling($Files.Count / $cols)
  $sheet = New-Object System.Drawing.Bitmap ($cols * $thumb), ($rows * $thumb)
  $g = [System.Drawing.Graphics]::FromImage($sheet)
  $g.Clear([System.Drawing.Color]::FromArgb(35, 35, 35))

  for($i = 0; $i -lt $Files.Count; $i++){
    $img = [System.Drawing.Image]::FromFile($Files[$i])
    try {
      $scale = [Math]::Min(($thumb - 20) / $img.Width, ($thumb - 20) / $img.Height)
      $w = [int]($img.Width * $scale)
      $h = [int]($img.Height * $scale)
      $x = ($i % $cols) * $thumb + [int](($thumb - $w) / 2)
      $y = [Math]::Floor($i / $cols) * $thumb + [int](($thumb - $h) / 2)
      $g.DrawImage($img, $x, $y, $w, $h)
    } finally {
      $img.Dispose()
    }
  }

  $g.Dispose()
  $sheet.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $sheet.Dispose()
}

$sourcePath = Resolve-Path -LiteralPath $SourceDir
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
$outputPath = Resolve-Path -LiteralPath $OutputDir

$files = Get-ChildItem -LiteralPath $sourcePath -File | Where-Object {
  $_.Extension.ToLowerInvariant() -in @('.png', '.jpg', '.jpeg')
}
if($files.Count -eq 0){
  Write-Host "처리할 이미지가 없습니다: $sourcePath"
  exit 0
}

$sources = @()
$outputs = @()
foreach($file in $files){
  $name = [IO.Path]::GetFileNameWithoutExtension($file.Name)
  $dst = Join-Path $outputPath ("{0}{1}.png" -f $Prefix, $name)
  $sources += $file.FullName
  $outputs += $dst
}

[TransparentAssetProcessor]::ProcessBatch($sources, $outputs, $MaxParallel)

if($Preview){
  $previewPath = Join-Path $outputPath "_preview.png"
  New-PreviewSheet -Files $outputs -OutPath $previewPath
  Write-Host "미리보기 생성: $previewPath"
}

Write-Host ("완료: {0}개 이미지 처리" -f $outputs.Count)
