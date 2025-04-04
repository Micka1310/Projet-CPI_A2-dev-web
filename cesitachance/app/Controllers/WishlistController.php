<?php
// Fichier : /app/Controllers/WishlistController.php

session_start(); // ➕ Nécessaire pour accéder à $_SESSION

require_once __DIR__ . '/../../core/Database.php';
require_once __DIR__ . '/../Models/Wishlist.php';

header("Content-Type: application/json; charset=UTF-8");

$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

// ✅ Récupère les infos de l'utilisateur depuis la session
$id_utilisateur = $_SESSION['id_utilisateur'] ?? null;
$mail_utilisateur = $_SESSION['mail_utilisateur'] ?? null;
$role_utilisateur = $_SESSION['role'] ?? null;

// ➕ Vérification de base : connecté et rôle valide
if (!$id_utilisateur || !$mail_utilisateur || !in_array($role_utilisateur, ['etudiant', 'admin'])) {
    echo json_encode(["success" => false, "message" => "Accès non autorisé"]);
    exit;
}

switch ($action) {
    case 'get':
        try {
            $resultats = Wishlist::getAll($pdo, $id_utilisateur);
            echo json_encode(["success" => true, "data" => $resultats]);
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    case 'readDetails':
        try {
            $resultats = Wishlist::getDetails($pdo, $id_utilisateur);
            echo json_encode($resultats);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
        }
        break;

    case 'add':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id_offre'])) {
            echo json_encode(["success" => false, "message" => "ID de l'offre manquant"]);
            exit;
        }

        try {
            $ok = Wishlist::add($pdo, $data['id_offre'], $mail_utilisateur);
            if ($ok) {
                echo json_encode(["success" => true, "message" => "Offre ajoutée à la wishlist"]);
            } else {
                echo json_encode(["success" => false, "message" => "Offre déjà présente"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    case 'delete':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['id_offre'])) {
            echo json_encode(["success" => false, "message" => "ID de l'offre manquant"]);
            exit;
        }

        try {
            $ok = Wishlist::delete($pdo, $data['id_offre'], $id_utilisateur);
            echo json_encode(["success" => $ok, "message" => $ok ? "Offre supprimée" : "Échec de la suppression"]);
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
        break;

    default:
        echo json_encode(["success" => false, "message" => "Action non reconnue"]);
        break;
}
?>