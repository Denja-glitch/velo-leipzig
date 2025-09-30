<?php

$data = include('02_transform.php') ;

require_once '../config.php'; // Bindet die Datenbankkonfiguration ein

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $sql = "INSERT INTO bike_leipzig (available, booked, temp, rain, place) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);

    foreach ($data as $station) {
        $stmt->execute([
            $station['available'],
            $station['booked'],
            $station['temp'],
            $station['rain'],
            $station['place'],
        ]);
    }

    echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}