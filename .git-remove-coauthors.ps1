$inputText = [Console]::In.ReadToEnd()
$output = [regex]::Replace($inputText, '(?mi)^Co-authored-by:.*\r?\n', '')
Write-Output $output
