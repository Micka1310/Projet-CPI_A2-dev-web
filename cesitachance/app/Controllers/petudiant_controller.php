<?php

require_once __DIR__ . '/../Models/Petudiant.php';
require_once __DIR__ . '/../../core/Database.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ob_start();

class PetudiantController {

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

                $etudiantModel = new Petudiant();
                $result = $etudiantModel->search($nom, $promotion, $mineure);

                $this->jsonResponse($result);
            }
        } catch (Exception $e) {
            $this->logError($e);
            $this->jsonResponse(["status" => "error", "message" => "Erreur lors de la recherche."], 500);
        }
    }

    public function addStudent() {
        try {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $email = trim($_POST['email'] ?? '');
                $password = trim($_POST['password'] ?? '');
                $name = strtoupper(trim($_POST['name'] ?? ''));
                $firstName = trim($_POST['firstName'] ?? '');
                $phone = trim($_POST['phone'] ?? '');
                $promotion = trim($_POST['promotion'] ?? '');
                $mineure = trim($_POST['mineure'] ?? '');

                if (empty($email) || empty($password) || empty($name) || empty($firstName) || empty($promotion) || empty($mineure) || empty($phone)) {
                    $this->jsonResponse(["status" => "error", "message" => "Tous les champs doivent être remplis."], 400);
                }

                $etudiantModel = new Petudiant();
                $success = $etudiantModel->upsert($email, $password, $name, $firstName, $promotion, $mineure, $phone);

                $this->jsonResponse([
                    "status" => $success ? "success" : "error",
                    "message" => $success ? null : "L'insertion a échoué."
                ], $success ? 200 : 500);
            }
        } catch (Exception $e) {
            $this->logError($e);
            $this->jsonResponse(["status" => "error", "message" => "Erreur lors de l'ajout de l'étudiant."], 500);
        }
    }

    public function listStudents() {
        try {
            if ($_SERVER["REQUEST_METHOD"] === "GET") {
                $etudiantModel = new Petudiant();
                $students = $etudiantModel->getAllStudents();

                if (empty($students)) {
                    $this->jsonResponse(["status" => "error", "message" => "Aucun étudiant trouvé."], 404);
                }

                $this->jsonResponse($students);
            }
        } catch (Exception $e) {
            $this->logError($e);
            $this->jsonResponse(["status" => "error", "message" => "Erreur lors de la récupération des étudiants."], 500);
        }
    }

    public function deleteStudent() {
        try {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $data = json_decode(file_get_contents("php://input"), true);
                $email = trim($data["email"] ?? '');
    
                if (empty($email)) {
                    $this->jsonResponse(["status" => "error", "message" => "Email manquant."], 400);
                }
    
                $etudiantModel = new Petudiant();
                $success = $etudiantModel->delete($email);
    
                $this->jsonResponse([
                    "status" => $success ? "success" : "error",
                    "message" => $success ? null : "La suppression a échoué."
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
    $controller = new PetudiantController();
    try {
        match ($_GET['action']) {
            'search' => $controller->search(),
            'add' => $controller->addStudent(),
            'delete' => $controller->deleteStudent(),
            'listStudents' => $controller->listStudents(),
            default => throw new Exception("Action inconnue")
        };
        
    } catch (Exception $e) {
        error_log("[" . date('Y-m-d H:i:s') . "] ROUTING ERROR: " . $e->getMessage() . PHP_EOL, 3, __DIR__ . '/../../logs/error.log');
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Action non valide"]);
    }
}

?>