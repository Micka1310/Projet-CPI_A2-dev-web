<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);


require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../Models/Entreprise.php';

header("Content-Type: application/json; charset=UTF-8");

$pdo = Database::getInstance()->getConnection(); // ✅ fonctionne avec le singleton


$action = $_GET['action'] ?? '';

switch ($action) {
    case 'getAll':
        try {
            $entreprises = Entreprise::getAll($pdo);
            echo json_encode($entreprises, JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        break;

    case 'update':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data || !isset($data['id'])) {
            http_response_code(400);
            echo json_encode(["erreur" => "Données invalides"]);
            exit;
        }
        try {
            $ok = Entreprise::update($pdo, $data);
            echo json_encode($ok ? "Entreprise modifiée avec succès." : "Erreur lors de la mise à jour.");
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["erreur" => $e->getMessage()]);
        }
        break;

    case 'rate':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id']) || !isset($data['note'])) {
            http_response_code(400);
            echo json_encode(["erreur" => "Données manquantes"]);
            exit;
        }
        try {
            $ok = Entreprise::rate($pdo, (int)$data['id'], (float)$data['note']);
            echo json_encode($ok ? "Note enregistrée avec succès" : "Échec de l'enregistrement");
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["erreur" => $e->getMessage()]);
        }
        break;

    case 'delete':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(["erreur" => "ID manquant"]);
            exit;
        }
        try {
            $ok = Entreprise::delete($pdo, (int)$data['id']);
            echo json_encode($ok ? "Entreprise supprimée avec succès" : "Échec de la suppression");
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["erreur" => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(400);
        echo json_encode(["erreur" => "Action non reconnue"]);
        break;
}
