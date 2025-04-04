<?php
// Fichier : /app/Controllers/statistiques_controller.php

require_once __DIR__ . '/../Models/stats.php';
require_once __DIR__ . '/../../core/Database.php';

header('Content-Type: application/json');

$domaine = $_GET['domaine'] ?? '';
$specialite = $_GET['specialite'] ?? '';
$type = $_GET['type'] ?? '';
$region = $_GET['region'] ?? '';
$nom = $_GET['nom'] ?? '';

try {
    $pdo = Database::getInstance()->getConnection();
    $model = new StatistiquesModel($pdo);
    $resultats = $model->getEntreprisesFiltres($domaine, $specialite, $type, $region, $nom);
    echo json_encode(["success" => true, "data" => $resultats]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
