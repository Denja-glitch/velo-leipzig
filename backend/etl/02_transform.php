<?php

$data = include('01_extract.php') ;

$places = $data['bikes']['countries'][0]['cities'][0]['places'];
$filtered_places = array_filter($places, function($value, $key) {
    $uids = [32097, 1200717, 7592517, 9559677];
    if (in_array($value['uid'], $uids)) {
        return true;
    } else {
        return false;
    }
}, ARRAY_FILTER_USE_BOTH);


/*Generiert eine zufällige Anzahl verfügbarer Bikes, da Daten der API unbrauachbar.*/
function randomize_available() {
    return rand(0, 40);
}

/* Generiert eine zufällige Anzahl gebuchter Bikes, da Daten der API unbrauachbar.*/
function randomize_booked() {
    return rand(0, 35);
}

$transformed_data = [];
foreach($filtered_places as $place) {
    $transformed_data[] = [
        'available' => randomize_available(),
        'booked' => randomize_booked(),
        'temp' => $data['weather']['current']['temperature_2m'],
        'rain' => $data['weather']['current']['rain'],
        'place' => $place['uid']
    ];
};

return $transformed_data;