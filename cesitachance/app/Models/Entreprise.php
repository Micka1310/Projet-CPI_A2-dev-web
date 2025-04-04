<?php

class Entreprise {
    public $Id_Entreprise;
    public $Nom;
    public $Adresse;
    public $Domaine;
    public $logo;
    public $url;
    public $Description;
    public $Adresse_mail;
    public $Specialite;
    public $Region;
    public $Type_Entreprise;
    public $Date_Publication;
    public $Nb_Stagiaires_Postules;

    public function __construct(array $data) {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public static function getAll(PDO $pdo): array {
        $stmt = $pdo->query("SELECT * FROM entreprise");
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map(fn($e) => new Entreprise($e), $result);
    }

    public static function update(PDO $pdo, array $data): bool {
        $stmt = $pdo->prepare("UPDATE entreprise SET Nom=?, Adresse=?, Adresse_mail=?, Domaine=?, Specialite=?, Region=?, Type_Entreprise=? WHERE Id_Entreprise=?");
        return $stmt->execute([
            $data['Nom'], $data['Adresse'], $data['Adresse_mail'],
            $data['Domaine'], $data['Specialite'], $data['Region'],
            $data['Type_Entreprise'], $data['id']
        ]);
    }

    public static function rate(PDO $pdo, int $id, float $note): bool {
        $stmt = $pdo->prepare("UPDATE entreprise SET Note = ? WHERE Id_Entreprise = ?");
        return $stmt->execute([$note, $id]);
    }

    public static function delete(PDO $pdo, int $id): bool {
        $stmt = $pdo->prepare("DELETE FROM entreprise WHERE Id_Entreprise = ?");
        return $stmt->execute([$id]);
    }
}
