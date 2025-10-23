<?php
if (!isset($_GET['url'])) {
    header("HTTP/1.1 400 Bad Request");
    echo "URL ausente";
    exit;
}

$url = $_GET['url'];
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "User-Agent: Mozilla/5.0",
    "Referer: https://www-fontedecanais-io.79xddz54cefe70.com/"
]);
curl_exec($ch);
curl_close($ch);
?>
