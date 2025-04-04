<?php
class StatistiquesModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getEntreprisesFiltres($domaine, $specialite, $type, $region, $nom) {
        $sql = "SELECT * FROM entreprise WHERE 1=1";
        $params = [];

        if (!empty($domaine)) {
            $sql .= " AND LOWER(Domaine) LIKE :domaine";
            $params[':domaine'] = '%' . strtolower($domaine) . '%';
        }
        if (!empty($specialite)) {
            $sql .= " AND LOWER(Specialite) LIKE :specialite";
            $params[':specialite'] = '%' . strtolower($specialite) . '%';
        }
        if (!empty($type)) {
            $sql .= " AND LOWER(Type_Entreprise) LIKE :type";
            $params[':type'] = '%' . strtolower($type) . '%';
        }
        if (!empty($region)) {
            $sql .= " AND LOWER(Region) LIKE :region";
            $params[':region'] = '%' . strtolower($region) . '%';
        }
        if (!empty($nom)) {
            $sql .= " AND LOWER(Nom) LIKE :nom";
            $params[':nom'] = '%' . strtolower($nom) . '%';
        }

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
