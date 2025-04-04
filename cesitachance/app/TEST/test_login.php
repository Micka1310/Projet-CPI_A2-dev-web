<?php
require_once __DIR__ . '/Models/Utilisateur.php';

$model = new Utilisateur();
$user = $model->login("test@mail.com", "azerty");

if ($user) {
    echo "✅ Connexion réussie pour : " . $user['Prenom_Utilisateur'];
} else {
    echo "❌ Identifiants invalides.";
}
