<?php
require_once __DIR__ . '/../core/Database.php';

$db = Database::getInstance()->getConnection();

if ($db) {
    echo "Connexion réussie !";
} else {
    echo "Erreur de connexion.";
}
?>
