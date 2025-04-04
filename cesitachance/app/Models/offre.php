<?php

/*pour créer une nouvelle offre*/
function creer_offre($titre, $description_offre, $competences, $remuneration, 
$langue, $duree_stage, $specialite, $avantages, $villes, $nom_entreprise, $logo, 
$teletravail, $niveau_etude)
{
    global $pdo;

    $requete_chercher_entreprise = "SELECT Id_Entreprise FROM entreprise WHERE Nom = :nom_entreprise";
    $stmt = $pdo->prepare($requete_chercher_entreprise);
    $stmt->execute(['nom_entreprise' => $nom_entreprise]);
    $id_entreprise = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($id_entreprise) 
    {
        $id_entreprise_recuperer = $id_entreprise['Id_Entreprise'];
    } 
    
    else 
    {
        echo 'Erreur : L\'entreprise \'$nom_entreprise\' n\'existe pas.';
    }

    $requete_creer_offre = "INSERT INTO offre (Titre, Description_Offre, Competences, Remuneration, Langue, Duree_Stage, Specialité, Avantages, Villes, id_Entreprise, logo, teletravail, Niveau_Etude)
    VALUES (:titre, :description_offre, :competences, :remuneration, :langue, :duree_stage, :specialite, :avantages, :villes, :id_entreprise, :logo, :teletravail, :niveau_etude)";

    $stmt = $pdo->prepare($requete_creer_offre);
    $stmt->execute([
        ':titre' => $titre,
        ':description_offre' => $description_offre,
        ':competences' => $competences,
        ':remuneration' => $remuneration,
        ':langue' => $langue,
        ':duree_stage' => $duree_stage,
        ':specialite' => $specialite,
        ':avantages' => $avantages,
        ':villes' => $villes,
        ':id_entreprise' => $id_entreprise_recuperer,
        ':logo' => $logo,
        ':teletravail' => $teletravail,
        ':niveau_etude' => $niveau_etude
    ]);
}


/*pour modifier l'offre qu'on affiche actuellement*/
function modifier_offre($id_offre_v2, $titre_v2, $description_offre_v2, $competences_v2, $remuneration_v2, 
$langue_v2, $duree_stage_v2, $specialite_v2, $avantages_v2, $villes_v2, $nom_entreprise_v2, $logo_v2, 
$teletravail_v2, $niveau_etude_v2)
{
    global $pdo;

    $requete_chercher_entreprise_v2 = "SELECT Id_Entreprise FROM entreprise WHERE Nom = :nom_entreprise";
    $stmt = $pdo->prepare($requete_chercher_entreprise_v2);
    $stmt->execute(['nom_entreprise' => $nom_entreprise_v2]);
    $id_entreprise_v2 = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($id_entreprise_v2) 
    {
        $id_entreprise_recuperer_v2 = $id_entreprise_v2['Id_Entreprise'];
    } 
    
    else 
    {
        echo 'Erreur : L\'entreprise \'$nom_entreprise\' n\'existe pas.';
    }

    $requete_modifier_offre = "UPDATE offre 
    SET Titre = :titre_v2,  Description_Offre = :description_offre_v2, Competences = :competences_v2, Remuneration = :remuneration_v2, 
    Langue = :langue_v2, Duree_Stage = :duree_stage_v2, Specialité = :specialite_v2, Avantages = :avantages_v2, Villes = :villes_v2, 
    logo = :logo_v2, teletravail = :teletravail_v2, Niveau_Etude = :niveau_etude_v2 
    WHERE Id_Offre = :id_offre_v2 AND Id_Entreprise = :id_entreprise_v2";

    $stmt = $pdo->prepare($requete_modifier_offre);
    $stmt->execute([
        ':titre_v2' => $titre_v2,
        ':description_offre_v2' => $description_offre_v2,
        ':competences_v2' => $competences_v2,
        ':remuneration_v2' => $remuneration_v2,
        ':langue_v2' => $langue_v2,
        ':duree_stage_v2' => $duree_stage_v2,
        ':specialite_v2' => $specialite_v2,
        ':avantages_v2' => $avantages_v2,
        ':villes_v2' => $villes_v2,
        ':id_entreprise_v2' => $id_entreprise_recuperer_v2,
        ':logo_v2' => $logo_v2,
        ':teletravail_v2' => $teletravail_v2,
        ':niveau_etude_v2' => $niveau_etude_v2,
        ':id_offre_v2' => $id_offre_v2
    ]);
}


/*afficher l'offre sélectionner*/
function affiche_offre_selectionner($offre_choisi)
{
    global $pdo;

    if (isset($_GET['id_offre'])) 
    {
        $id_offre = (int) $_GET['id_offre'];
    
        $stmt = $pdo->prepare
        (
    "SELECT o.*, e.Nom
            FROM offre o 
            JOIN entreprise e ON o.id_Entreprise = e.id_Entreprise 
            WHERE o.Id_Offre = ?"
        );

        $stmt->execute([$id_offre]);
        $offre_choisi = $stmt->fetch(PDO::FETCH_ASSOC);

        return $offre_choisi;
    }
}


/*pour récupérer et afficher les logos des entreprises depuis la BDD*/
/*function affiche_logo()
{
    global $pdo;

    if (isset($_GET['id_entreprise'])) 
    {
        $id_entreprise = (int) $_GET['id_entreprise'];
    
        $stmt = $pdo->prepare("SELECT logo 
        FROM entreprise 
        WHERE id_Entreprise = ?");

        $stmt->execute([$id_entreprise]);
        $entreprise = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($entreprise && !empty($entreprise['logo'])) 
        {
            header("Content-Type: image/jpeg"); // Assurez-vous que le type MIME est correct
            echo $entreprise['logo'];
        } 
        
        else 
        {
            // Afficher une image par défaut ou un message d'erreur
            //header("Content-Type: image/png");
            readfile('chemin/vers/image_par_defaut.png');
        }
    }
}*/


/*supprime l'offre actuellement affiché*/
function suppression_offre()
{
    global $pdo;

    $id_offre = (int) $_POST['id_offre_supprimer'];

    // Supprimer l'offre de la base de données
    $stmt = $pdo->prepare("DELETE FROM offre WHERE Id_Offre = ?");
    $stmt->execute([$id_offre]);

    // Rediriger après la suppression pour éviter de resoumettre le formulaire
    //header("Location: index.php"); // Remplace "index.php" par la page de la liste des offres
    //exit();
}


/*pour afficher les offres en fonction de la saisie de la barre de recherche de mot clé*/
function affiche_offre()
{
    global $pdo, $limit, $offset;

    $affichage = "SELECT * 
    FROM offre 
    LIMIT :limit OFFSET :offset";

    $stmt = $pdo->prepare($affichage);
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $offre_afficher = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $offre_afficher;
}


/*pour envoyer une candidature*/
function envoyer_candidature($postule_mail, $postule_numero, /*$postule_cv, $postule_lettre_motivation,*/ $id_offre)
{
    global $pdo;

    $id_offre_convertit = (int) $id_offre['id_offre'];

    /*$requete_chercher_offre = "SELECT Id_Offre FROM offre WHERE Id_Offre = :id_offre";
    
    $stmt = $pdo->prepare($requete_chercher_offre);
    $stmt->execute([':id_offre' => $id_offre_convertit]);
    
    $donne_id = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($donne_id) 
    {
        $donne_id_recuperer = $donne_id['Id_Offre'];
    } 
    
    else 
    {
        echo 'Erreur : La candidature n\'a pas été envoyer.';
    }*/

    $requete_creer_candidature = "INSERT INTO postule (Mail_Utilisateur, Id_Offre, /*CV, Lettre_De_Motivation,*/ Numero_Telephone_Offre)
    VALUES (:Mail_Utilisateur, :Id_Offre, /*:CV, :Lettre_De_Motivation,*/ :Numero_Telephone_Offre)";

    $stmt = $pdo->prepare($requete_creer_candidature);
    $stmt->execute([
        ':Mail_Utilisateur' => $postule_mail,
        ':Id_Offre' => /*$donne_id_recuperer*/$id_offre_convertit,
        /*':CV' => $postule_cv,
        ':Lettre_De_Motivation' => $postule_lettre_motivation,*/
        ':Numero_Telephone_Offre' => $postule_numero
    ]);
}

/*pour afficher les offres en fonction de la saisie de la barre de recherche de mot clé*/
/*function recherche_nom($recherche_nom)
{
    global $pdo, $limit, $offset;

    $requete_afficher_nom = "SELECT * 
    FROM offre 
    LIMIT :limit OFFSET :offset
    WHERE Titre = :titre";

    $stmt = $pdo->prepare($requete_afficher_nom);
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $stmt = $pdo->prepare($requete_afficher_nom);

    $stmt->execute([':titre' => $recherche_nom]);
    $offre_afficher_nom = $stmt->fetch(PDO::FETCH_ASSOC);

    return $offre_afficher_nom;
}*/