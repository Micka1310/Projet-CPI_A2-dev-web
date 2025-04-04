<?php

require_once __DIR__ . '/../../core/Database.php';

class Utilisateur {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
    }

    /**
     * Tente de connecter un utilisateur avec un email et mot de passe.
     * @param string $email
     * @param string $password
     * @return array|false Retourne les infos de l'utilisateur (sans mot de passe) ou false si erreur
     */
    public function login($email, $password) {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM utilisateur WHERE Mail_Utilisateur = :email");
            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['Mot_De_Passe'])) {
                unset($user['Mot_De_Passe']); // Ne jamais retourner le mot de passe
                return $user;
            }
        } catch (PDOException $e) {
            // Log l’erreur si nécessaire, sans l’afficher côté client
            error_log("Erreur login utilisateur : " . $e->getMessage());
        }

        return false;
    }

    public function findAllByRole($role) {
        $sql = "SELECT * FROM utilisateur WHERE Permission = :role";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['role' => $role]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
}
