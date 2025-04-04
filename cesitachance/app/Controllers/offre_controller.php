<?php

require_once __DIR__ . '/../../core/database_offre.php';
require_once __DIR__ . '/../Models/offre.php';

/*pour créer une nouvelle offre*/
if(isset($_POST['creer_enregistrer_offre']))
{
    $creer_titre_offre = trim($_POST['creer_titre_offre']);
    $creer_nom_entreprise_offre = trim($_POST['creer_nom_entreprise_offre']);
    $creer_ville_entreprise_offre = trim($_POST['creer_ville_entreprise_offre']);
    $creer_specialite_offre = trim($_POST['creer_specialite_offre']);
    $creer_niveau_etude_offre = trim($_POST['creer_niveau_etude_offre']);
    $creer_duree_stage_offre = trim($_POST['creer_duree_stage_offre']);
    $creer_teletravail_offre = trim($_POST['creer_teletravail_offre']);
    $creer_salaire_offre = trim($_POST['creer_salaire_offre']);
    $creer_langue_offre = trim($_POST['creer_langue_offre']);
    $creer_logo_offre = trim($_POST['creer_logo_offre']);
    $creer_presentation_offre = trim($_POST['creer_presentation_offre']);
    $creer_competence_offre = trim($_POST['creer_competence_offre']);
    $creer_avantage_offre = trim($_POST['creer_avantage_offre']);
    
    
    if(
        !empty($creer_titre_offre) && !empty($creer_nom_entreprise_offre) && !empty($creer_ville_entreprise_offre) 
    && !empty($creer_specialite_offre) && !empty($creer_niveau_etude_offre) && !empty($creer_duree_stage_offre) 
    && !empty($creer_salaire_offre) && !empty($creer_logo_offre)
    )
    {
        creer_offre(
            $creer_titre_offre, $creer_presentation_offre, $creer_competence_offre, 
        $creer_salaire_offre, $creer_langue_offre, $creer_duree_stage_offre, 
        $creer_specialite_offre, $creer_avantage_offre, $creer_ville_entreprise_offre,
        $creer_nom_entreprise_offre, $creer_logo_offre, $creer_teletravail_offre, 
        $creer_niveau_etude_offre
        );
    
        //header('location:');
        //echo '<p>Création de l\'offre réussis !</p>';
        //exit();
    }

    else
    {
        echo '<p>Tout les champs ne sont pas remplies ! Aucun utilisateur n\'a été créer.</p>';
    }
}


/*pour modifier une nouvelle offre*/
if(isset($_POST['modifier_enregistrer_offre']))
{
    $id_offre = (int)$_GET['id_offre'];
    $modifier_titre_offre = trim($_POST['modifier_titre_offre_v2']);
    $modifier_nom_entreprise_offre = trim($_POST['modifier_nom_entreprise_offre_v2']);
    $modifier_ville_entreprise_offre = trim($_POST['modifier_ville_entreprise_offre_v2']);
    $modifier_specialite_offre = trim($_POST['modifier_specialite_offre_v2']);
    $modifier_niveau_etude_offre = trim($_POST['modifier_niveau_etude_offre_v2']);
    $modifier_duree_stage_offre = trim($_POST['modifier_duree_stage_offre_v2']);
    $modifier_teletravail_offre = trim($_POST['modifier_teletravail_offre_v2']);
    $modifier_salaire_offre = trim($_POST['modifier_salaire_offre_v2']);
    $modifier_langue_offre = trim($_POST['modifier_langue_offre_v2']);
    $modifier_logo_offre = trim($_POST['modifier_logo_offre_v2']);
    $modifier_presentation_offre = trim($_POST['modifier_presentation_offre_v2']);
    $modifier_competence_offre = trim($_POST['modifier_competence_offre_v2']);
    $modifier_avantage_offre = trim($_POST['modifier_avantage_offre_v2']);
    
    
    if(!empty($modifier_titre_offre) && !empty($modifier_nom_entreprise_offre) && !empty($modifier_ville_entreprise_offre) 
    && !empty($modifier_specialite_offre) && !empty($modifier_niveau_etude_offre) && !empty($modifier_duree_stage_offre) 
    && !empty($modifier_salaire_offre) && !empty($modifier_logo_offre))
    {
        modifier_offre($id_offre ,$modifier_titre_offre, $modifier_presentation_offre, $modifier_competence_offre, 
        $modifier_salaire_offre, $modifier_langue_offre, $modifier_duree_stage_offre, 
        $modifier_specialite_offre, $modifier_avantage_offre, $modifier_ville_entreprise_offre,
        $modifier_nom_entreprise_offre, $modifier_logo_offre, $modifier_teletravail_offre, 
        $modifier_niveau_etude_offre);
    
        //header('location:');
        //echo '<p>Création de l\'offre réussis !</p>';
        //exit();
    }

    else
    {
        echo '<p>Tout les champs ne sont pas remplies ! Aucun utilisateur n\'a été modifier.</p>';
    }
}


/*vérifie l'ID d'offre qui est passé dans l'URL*/
$offre_choisi = affiche_offre_selectionner($offre_choisi);


/*pour récupérer et afficher les logos des entreprises depuis la BDD*/
//affiche_logo();


/*pour la pagination*/
if(!isset($_GET['bouton_rechercher']))
{
    $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
    $limit = 4;
    $offset = ($page - 1) * $limit;

    $affichage = "SELECT * FROM offre LIMIT :limit OFFSET :offset";
    $stmt = $pdo->prepare($affichage);
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $donne_offre = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $total_offre = $pdo->query("SELECT COUNT(*) FROM offre")->fetchColumn();
    $total_page = ceil($total_offre / $limit);
}


//$testtext = 'Ca marche marche pas';
/*pour afficher les offres en fonction de la saisie de la barre de recherche de mot clé*/
/*if(isset($_GET['bouton_rechercher']) && !empty($_GET('recherche_nom')))
{
    $testtext = 'Ca marche';
    header("Location: offre.html");
    $saisie_nom = trim($_GET('recherche_nom'));
    $donne_offre = recherche_nom($saisie_nom);

    $stmt = $pdo->prepare($affichage);
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute([
        ':titre' => $offre_afficher_nom
    ]);

    //$donne_offre = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $total_offre = $pdo->query("SELECT COUNT(*) FROM offre")->fetchColumn();
    $total_page = ceil($total_offre / $limit);
}*/



//else
//{
    /*$affichage = "SELECT * FROM offre LIMIT :limit OFFSET :offset";
    $stmt = $pdo->prepare($affichage);
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();*/
    //$donne_offre = affiche_offre();

    //$donne_offre = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //$total_offre = $pdo->query("SELECT COUNT(*) FROM offre")->fetchColumn();
    //$total_page = ceil($total_offre / $limit);
//}


$test_erreur = 'ca marche pas';
/*pour envoyer une candidature*/
if(isset($_POST['postule_valider']))
{
    $postule_mail = trim($_POST['postule_mail']);
    $postule_numero = trim($_POST['postule_numero']);
    //$postule_cv = trim($_POST['postule_cv']);
    //$postule_lettre_motivation = trim($_POST['postule_lettre_motivation']);
    
    if(
        !empty($postule_mail) && !empty($postule_numero)// && !empty($postule_cv) 
        //&& !empty($postule_lettre_motivation)
    )
    {
        //$test_erreur = print_r($_GET['id_offre']);
        envoyer_candidature($postule_mail, $postule_numero, /*$postule_cv, */
        /*$postule_lettre_motivation,*/ $_GET['id_offre']);
    
        //header('location:');
        //echo '<p>Création de l\'offre réussis !</p>';
        //exit();
    }
    
    else
    {
        echo '<p>Tout les champs ne sont pas remplies ! Aucun utilisateur n\'a été créer.</p>';
    }
}




/*pour la suppression de l'offre*/
if (isset($_POST['offre_supprimer']) && isset($_POST['id_offre_supprimer'])) 
{
    suppression_offre();
}