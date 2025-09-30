<?php

function fetchVeloData() {
    $url = "https://api.nextbike.net/maps/nextbike-live.json?city=1";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}

function fetchWeatherData() {
    $url = "https://api.open-meteo.com/v1/forecast?latitude=51.33942332894444&longitude=12.68820581771105&current=temperature_2m%2Crelative_humidity_2m%2Crain%2Cweather_code";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}


/*echo '<pre>';
var_dump(fetchVeloData());
var_dump(fetchWeatherData());
echo '</pre>';*/

return [
    'weather' => fetchWeatherData(),
    'bikes' => fetchVeloData(),
];

?>