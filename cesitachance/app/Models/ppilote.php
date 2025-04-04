<?php
require_once __DIR__ . '/../../core/Database.php';

class Ppilote {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
    }

    public function upsert($email, $password, $name, $firstName, $promotion, $mineure, $phone) {
        try {
            $stmt = $this->pdo->prepare("SELECT 1 FROM utilisateur WHERE Mail_Utilisateur = :email");
            $stmt->execute(['email' => $email]);

            $isUpdate = $stmt->fetch();

            $query = $isUpdate ?
                "UPDATE utilisateur SET 
                    Mot_De_Passe = :password,
                    Nom_Utilisateur = :name,
                    Prenom_Utilisateur = :firstName,
                    Numero_de_telephone = :phone,
                    Promotion = :promotion,
                    Mineure = :mineure,
                    Permission = 'pilote'
                 WHERE Mail_Utilisateur = :email" :

                "INSERT INTO utilisateur (
                    Mail_Utilisateur, Mot_De_Passe, Nom_Utilisateur, Prenom_Utilisateur,
                    Numero_de_telephone, Permission, Promotion, Mineure
                ) VALUES (
                    :email, :password, :name, :firstName,
                    :phone, 'pilote', :promotion, :mineure
                )";

            $stmt = $this->pdo->prepare($query);

            $success = $stmt->execute([
                'email' => $email,
                'password' => password_hash($password, PASSWORD_DEFAULT),
                'name' => $name,
                'firstName' => $firstName,
                'phone' => $phone,
                'promotion' => $promotion,
                'mineure' => $mineure
            ]);

            return $success;
        } catch (PDOException $e) {
            error_log("Erreur SQL (upsert pilote) : " . $e->getMessage());
            return false;
        }
    }

    public function search($nom = "", $promotion = "", $mineure = "") {
        $query = "SELECT * FROM utilisateur WHERE LOWER(Permission) = 'pilote'";

        $params = [];

        if ($nom !== "") {
            $query .= " AND (Nom_Utilisateur LIKE :nom OR Prenom_Utilisateur LIKE :nom)";
            $params['nom'] = "%$nom%";
        }
        if ($promotion !== "" && $promotion !== "Tout") {
            $query .= " AND Promotion = :promotion";
            $params['promotion'] = $promotion;
        }
        if ($mineure !== "" && $mineure !== "Tout") {
            $query .= " AND Mineure = :mineure";
            $params['mineure'] = $mineure;
        }

        $stmt = $this->pdo->prepare($query);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllPilotes() {
        $stmt = $this->pdo->prepare("SELECT Mail_Utilisateur, Nom_Utilisateur, Prenom_Utilisateur, Numero_de_telephone, Promotion, Mineure FROM utilisateur WHERE Permission = 'pilote'");
        $stmt->execute();
    
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    

    public function delete($email) {
        $stmt = $this->pdo->prepare("DELETE FROM utilisateur WHERE Mail_Utilisateur = :email AND Permission = 'pilote'");
        return $stmt->execute(['email' => $email]);
    }
}

?>