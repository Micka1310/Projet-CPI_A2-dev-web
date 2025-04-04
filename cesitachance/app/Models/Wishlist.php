<?php
// Fichier : /app/Models/Wishlist.php

require_once __DIR__ . '/../../core/Database.php';

class Wishlist {
    public static function getAll(PDO $pdo, int $userId): array {
        $stmt = $pdo->prepare("SELECT * FROM ajoute_wishlist WHERE Id_Utilisateur = ?");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getDetails(PDO $pdo, int $userId): array {
        $stmt = $pdo->prepare("SELECT Id_Offre, Date_Ajout FROM ajoute_wishlist WHERE Id_Utilisateur = ?");
        $stmt->execute([$userId]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map(function ($row) {
            return [
                'id' => $row['Id_Offre'],
                'titre' => "Stage simulé #" . $row['Id_Offre'],
                'date' => $row['Date_Ajout'],
                'favoris' => '⭐',
                'reponse' => 'Non'
            ];
        }, $data);
    }

    public static function add(PDO $pdo, int $idOffre, string $mail): bool {
        $stmt = $pdo->prepare("SELECT * FROM ajoute_wishlist WHERE Id_Offre = ? AND Mail_Utilisateur = ?");
        $stmt->execute([$idOffre, $mail]);

        if ($stmt->rowCount() > 0) return false;

        $insert = $pdo->prepare("INSERT INTO ajoute_wishlist (Id_Offre, Mail_Utilisateur) VALUES (?, ?)");
        return $insert->execute([$idOffre, $mail]);
    }

    public static function delete(PDO $pdo, int $idOffre, int $userId): bool {
        $stmt = $pdo->prepare("DELETE FROM ajoute_wishlist WHERE Id_Offre = ? AND Id_Utilisateur = ?");
        return $stmt->execute([$idOffre, $userId]);
    }
}
?>