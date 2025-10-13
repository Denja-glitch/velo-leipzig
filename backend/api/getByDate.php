<?php

require_once '../config.php'; 

header('Content-Type: application/json');


try {
    // -> Login auf Datenbank
    $pdo = new PDO($dsn, $username, $password, $options);

    $date = $_GET['date'];
    $place = $_GET['place'];

    $sql = "SELECT * FROM bike_leipzig WHERE DATE(timestamp) = :date AND place = :place";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([ 'date' => $date, 'place' => $place ]);
// -> Daten in Empfang nehmen
$resulsts = $stmt->fetchAll();

// -> Daten als Json zurückgeben
echo json_encode ($resulsts);} 


catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}