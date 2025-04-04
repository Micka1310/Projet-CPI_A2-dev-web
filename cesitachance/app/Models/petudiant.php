<?php

require_once __DIR__ . '/../../core/Database.php';

class Petudiant {
    private $pdo;

    public function __construct() {
        $this->pdo = Database::getInstance()->getConnection();
    }

    // Insérer ou mettre à jour un étudiant
    public function upsert($email, $password, $name, $firstName, $promotion, $mineure, $phone) {
        $stmt = $this->pdo->prepare("SELECT 1 FROM utilisateur WHERE Mail_Utilisateur = :email");
        $stmt->execute(['email' => $email]);

        $query = $stmt->fetch() ?
            "UPDATE utilisateur SET 
                Mot_De_Passe = :password,
                Nom_Utilisateur = :name,
                Prenom_Utilisateur = :firstName,
                Numero_de_telephone = :phone,
                Promotion = :promotion,
                Mineure = :mineure
             WHERE Mail_Utilisateur = :email" :

            "INSERT INTO utilisateur (
                Mail_Utilisateur, Mot_De_Passe, Nom_Utilisateur, Prenom_Utilisateur,
                Numero_de_telephone, Permission, Promotion, Mineure
            ) VALUES (
                :email, :password, :name, :firstName,
                :phone, 'etudiant', :promotion, :mineure
            )";

        $stmt = $this->pdo->prepare($query);

        return $stmt->execute([
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'name' => $name,
            'firstName' => $firstName,
            'phone' => $phone,
            'promotion' => $promotion,
            'mineure' => $mineure
        ]);
    }

    // Recherche d'étudiants
    public function search($nom = "", $promotion = "", $mineure = "") {
        $query = "SELECT * FROM utilisateur WHERE Permission = 'etudiant'";
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

    // Récupérer tous les étudiants
    public function getAllStudents() {
        $stmt = $this->pdo->prepare("SELECT Nom_Utilisateur, Prenom_Utilisateur, Promotion, Mineure FROM utilisateur WHERE Permission = 'etudiant'");
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Supprimer un étudiant
    public function delete($email) {
        $stmt = $this->pdo->prepare("DELETE FROM utilisateur WHERE Mail_Utilisateur = :email AND Permission = 'etudiant'");
        return $stmt->execute(['email' => $email]);
    }
    
}

?>