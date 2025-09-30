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

$transformed_data = [];
foreach($filtered_places as $place) {
    $transformed_data[] = [
        'available' => $place['bikes_available_to_rent'],
        'booked' => $place['booked_bikes'],
        'temp' => $data['weather']['current']['temperature_2m'],
        'rain' => $data['weather']['current']['rain'],
        'place' => $place['uid']
    ];
};

return $transformed_data;