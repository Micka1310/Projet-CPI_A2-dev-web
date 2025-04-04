<?php
require_once __DIR__ . '/../core/Database.php';

$pdo = Database::getInstance()->getConnection();

$query = "INSERT INTO utilisateur (Mail_Utilisateur, Mot_De_Passe, Nom_Utilisateur, Prenom_Utilisateur, 
    Numero_de_telephone, Permission, Promotion, Mineure) 
    VALUES (:email, :password, :name, :firstName, :phone, 'etudiant', :promotion, :mineure)";

$stmt = $pdo->prepare($query);

$password = password_hash("test123", PASSWORD_DEFAULT); // Hash long
$success = $stmt->execute([
    'email' => "test@example.com",
    'password' => $password,
    'name' => "DOE",
    'firstName' => "John",
    'phone' => "0123456789",
    'promotion' => "BUT3",
    'mineure' => "Commerce"
]);

if ($success) {
    echo "Insertion OK";
} else {
    var_dump($stmt->errorInfo());
}
