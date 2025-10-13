<?php

require_once '../config.php'; 


// -> json aktivieren
header('Content-Type: application/json');

// -> Verbindung mit der Datenbank
try {
    // -> Login auf Datenbank
    $pdo = new PDO($dsn, $username, $password, $options);

    $today = date('Y-m-d');

    $sql = "SELECT * FROM bike_leipzig WHERE DATE(timestamp) = :today";
    $stmt = $pdo->prepare($sql);

     // -> sql statement ausführen
    $stmt->execute([ 'today' => $today ]);
// -> Daten in Empfang nehmen
$resulsts = $stmt->fetchAll();

// -> Daten als Json zurückgeben
echo json_encode ($resulsts);} 


catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}