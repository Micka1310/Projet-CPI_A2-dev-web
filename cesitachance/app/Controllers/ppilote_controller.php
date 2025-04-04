<?php

require_once __DIR__ . '/../Models/ppilote.php';
require_once __DIR__ . '/../../core/Database.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class PpiloteController {
    private function jsonResponse($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        ob_clean();
        echo json_encode($data);
        exit;
    }

    private function logError($exception) {
        error_log("[" . date('Y-m-d H:i:s') . "] " . $exception->getMessage() . PHP_EOL, 3, __DIR__ . '/../../logs/error.log');
    }

    public function search() {
        try {
            if ($_SERVER["REQUEST_METHOD"] === "GET") {
                $nom = trim($_GET['nom_etudiant'] ?? '');
                $promotion = trim($_GET['promotion'] ?? '');
                $mineure = trim($_GET['mineure'] ?? '');
    
                error_log("DEBUG recherche pilotes: nom=$nom, promo=$promotion, mineure=$mineure");
    
                $pilotModel = new Ppilote();
                $result = $pilotModel->search($nom, $promotion, $mineure);
    
                error_log("Résultat: " . json_encode($result));
    
                $this->jsonResponse($result);
            }
        } catch (Exception $e) {
            $this->logError($e);
            $this->jsonResponse(["status" => "error", "message" => "Erreur lors de la recherche."], 500);
        }
    }
    

    public function addPilote() {
        try {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $email = trim($_POST['email'] ?? '');
                $password = trim($_POST['password'] ?? '');
                $name = strtoupper(trim($_POST['name'] ?? ''));
                $firstName = trim($_POST['firstName'] ?? '');
                $phone = trim($_POST['phone'] ?? '');
                $promotion = trim($_POST['promotion'] ?? '');
                $mineure = trim($_POST['mineure'] ?? '') ?: null; // rendre mineure optionnel

                if (empty($email) || empty($name) || empty($firstName) || empty($promotion) || empty($phone)) {
                    $this->jsonResponse(["status" => "error", "message" => "Veuillez remplir tous les champs obligatoires."], 400);
                }

                $pilotModel = new Ppilote();
                $success = $pilotModel->upsert($email, $password, $name, $firstName, $promotion, $mineure, $phone);

                $this->jsonResponse([
                    "status" => $success ? "success" : "error",
                    "message" => $success ? "Pilote ajouté ou modifié avec succès." : "L'insertion a échoué."
                ], $success ? 200 : 500);
            }
        } catch (Exception $e) {
            $this->logError($e);
            $this->jsonResponse(["status" => "error", "message" => "Erreur lors de l'ajout du pilote."], 500);
        }
    }

    public function listPilotes() {
        try {
            if ($_SERVER["REQUEST_METHOD"] === "GET") {
                $pilotModel = new Ppilote();
                $pilots = $pilotModel->getAllPilotes();

                if (empty($pilots)) {
                    $this->jsonResponse(["status" => "error", "message" => "Aucun pilote trouvé."], 404);
                }

                $this->jsonResponse($pilots);
            }
        } catch (Exception $e) {
            $this->logError($e);
            $this->jsonResponse(["status" => "error", "message" => "Erreur lors de la récupération des pilotes."], 500);
        }
    }

    public function deletePilote() {
        try {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $data = json_decode(file_get_contents("php://input"), true);
                $email = trim($data["email"] ?? '');

                if (empty($email)) {
                    $this->jsonResponse(["status" => "error", "message" => "Email manquant."], 400);
                }

                $pilotModel = new Ppilote();
                $success = $pilotModel->delete($email);

                $this->jsonResponse([
                    "status" => $success ? "success" : "error",
                    "message" => $success ? "Pilote supprimé avec succès." : "La suppression a échoué."
                ], $success ? 200 : 500);
            }
        } catch (Exception $e) {
            $this->logError($e);
            $this->jsonResponse(["status" => "error", "message" => "Erreur lors de la suppression."], 500);
        }
    }
}

// Routing
if (isset($_GET['action'])) {
    $controller = new PpiloteController();
    try {
        match ($_GET['action']) {
            'add' => $controller->addPilote(),
            'search' => $controller->search(),
            'delete' => $controller->deletePilote(),
            'list' => $controller->listPilotes(),
            default => throw new Exception("Action inconnue")
        };

    } catch (Exception $e) {
        error_log("[" . date('Y-m-d H:i:s') . "] ROUTING ERROR: " . $e->getMessage() . PHP_EOL, 3, __DIR__ . '/../../logs/error.log');
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Action non valide"]);
    }
}