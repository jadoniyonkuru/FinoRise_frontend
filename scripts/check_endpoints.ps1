$eps = '/api/auth/profile','/api/auth/login','/api/modules','/api/modules/1','/api/modules/1/lessons','/api/simulations','/api/rewards','/api/ai/ask','/api/admin/analytics'
foreach($e in $eps){
  $u = 'http://localhost:5000' + $e
  try{
    $r = Invoke-WebRequest -Uri $u -Method Head -UseBasicParsing -ErrorAction Stop
    $s = $r.StatusCode
  } catch {
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode){ $s = $_.Exception.Response.StatusCode.value__ } else { $s = 'ERR' }
  }
  Write-Host "$e -> $s -> $u"
}