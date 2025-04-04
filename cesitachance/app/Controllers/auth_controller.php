<?php
// Activer les erreurs pour le debug (à désactiver en prod)
ini_set('display_errors', 1);
error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


require_once __DIR__ . '/../Models/Utilisateur.php';
require_once __DIR__ . '/../../core/Database.php';

class AuthController {
    public function login() {
        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            
            $email = trim($_POST['email'] ?? '');
            $password = trim($_POST['password'] ?? '');

            $model = new Utilisateur();
            $user = $model->login($email, $password);

            $isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest';

            if ($user) {
                $_SESSION['user'] = $user; // Ne jamais stocker le mot de passe en session

                if ($isAjax) {
                    header('Content-Type: application/json');
                    echo json_encode([
                        'status' => 'success',
                        'role' => $user['Permission'],
                        'prenom' => $user['Prenom_Utilisateur'] ?? ''
                    ]);
                } else {
                    // Fallback HTML (peu utilisé, mais prévu)
                    header('Location: /index.html');
                }
            } else {
                if ($isAjax) {
                    header('Content-Type: application/json');
                    http_response_code(401);
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Identifiants incorrects'
                    ]);
                } else {
                    header('Location: /public/views/connexion.html');
                }
            }

            exit;
        }
    }

    public function logout() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        session_unset();
        session_destroy();

        header('Content-Type: application/json');
        echo json_encode(['status' => 'success']);
    }

    public function checkSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        header('Content-Type: application/json');

        if (isset($_SESSION['user'])) {
            echo json_encode([
                'connected' => true,
                'user' => $_SESSION['user']
            ]);
        } else {
            echo json_encode(['connected' => false]);
        }

        exit;
    }
}

// Point d'entrée contrôlé via URL ?action=...
$controller = new AuthController();
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        $controller->login();
        break;
    case 'logout':
        $controller->logout();
        break;
    case 'check':
        $controller->checkSession();
        break;
    default:
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Action invalide']);
        break;
}
