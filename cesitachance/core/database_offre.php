<?php

$host = 'localhost'; // Adresse du serveur (ou 127.0.0.1)
$dbname = 'cesitachance_db'; // Nom de la base de données
$username = 'root'; // Nom d'utilisateur MySQL (par défaut "root" en local)
$password = ''; // Mot de passe (vide en local avec XAMPP/WAMP)

try 
{
    // Création d'une instance PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    
    // Activation des erreurs PDO en mode Exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "✅ Connexion réussie à la base de données !";
} 

catch (PDOException $e) 
{
    // En cas d'erreur de connexion
    die("❌ Erreur de connexion : " . $e->getMessage());
}