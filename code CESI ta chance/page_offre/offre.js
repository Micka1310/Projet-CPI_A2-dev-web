/*JS de la page d'offre pour le projet dev web à CESI*/

const bouton_burger_1 = document.getElementById("bouton_burger_1");
const lien_burger_2 = document.getElementById("lien_burger_2");
const lien_burger_1 = document.getElementById("lien_burger_1");
const lien_profil_1 = document.getElementById("lien_profil_1");
const lien_profil_2 = document.getElementById("lien_profil_2");
const profil_1 = document.getElementById("profil_1");
const bouton_x_2 = document.getElementById("x_2");
const bouton_x_3 = document.getElementById("x_3");

let profil_afficher = false;
let lien_afficher = false;
let mode_portrait = window.matchMedia("(orientation: portrait)");
let mode_paysage = window.matchMedia("(orientation: landscape)");


/*pour faire apparaître/disparaitre les liens secondaires du bouton burger 
en appuyant sur le bouton burger*/
function clique_burger_1()
{
    let verif_mode_paysage = window.matchMedia("(orientation: landscape)").matches;
    
    if (!lien_afficher)
    {
        //version mobile
        if 
        (
            verif_mode_paysage
            && window.innerHeight < 600
            && window.innerWidth < 940)
        {
            lien_burger_1.style.transform = "translateX(0%)";
            lien_afficher = true;

            //pour debugger
            //console.log("fonction clique_burger_1 : !lien_afficher -> verif_mode_paysage && height < 600 && width < 940");
        }

        //version dekstop
        else if (verif_mode_paysage)
        {
            lien_burger_2.style.display = "flex";
            lien_burger_2.style.width = "auto"
            lien_profil_1.style.display = "none";
            lien_afficher = true;
            profil_afficher = false;

            //pour debugger
            //console.log("fonction clique_burger_1 : !lien_afficher -> verif_mode_paysage");
        }

        //version mobile
        else
        {
            lien_burger_1.style.transform = "translateX(0%)";
            lien_afficher = true;

            //pour debugger
            //console.log("fonction clique_burger_1 : !lien_afficher -> boucle else");
        }
    }

    //version dekstop
    else
    {
        if (verif_mode_paysage)
        {
            lien_burger_2.style.display = "none";
            lien_afficher = false;

            //pour debugger
            //console.log("fonction clique_burger_1 : boucle else -> verif_mode_paysage");
        }
    }
}

bouton_burger_1.addEventListener("click", clique_burger_1);


/*pour faire disparaitre les liens secondaires du bouton burger 
en appuyant sur la croix (mode portrait)*/
function clique_bouton_x_2()
{
    lien_burger_1.style.transform = "translateX(100%)";
    lien_afficher = false;

    //pour debugger
    //console.log("fonction clique_bouton_x_2");
}

bouton_x_2.addEventListener("click", clique_bouton_x_2);


/*pour faire apparaître/disparaitre le nom/prenom de l'utilisateur et l'option 
de deconnexion en appuyant sur le profil*/
function clique_profil()
{
    let verif_mode_paysage = window.matchMedia("(orientation: landscape)").matches;

    if (!profil_afficher)
    {
        //version mobile
        if 
        (
            verif_mode_paysage
            && window.innerHeight < 600
            && window.innerWidth < 940)
        {
            lien_profil_2.style.transform = "translateX(0%)";
            profil_afficher = true;

            //pour debugger
            //console.log("fonction clique_profil : !profil_afficher -> verif_mode_paysage && height < 600 && width < 940");
        }

        //version dekstop
        else if (verif_mode_paysage)
        {
            lien_profil_1.style.display = "flex";
            lien_burger_2.style.display = "none";
            profil_afficher = true;
            lien_afficher = false;

            //pour debugger
            //console.log("fonction clique_profil : !profil_afficher -> verif_mode_paysage");
        }

        //version mobile
        else
        {
            lien_profil_2.style.transform = "translateX(0%)";
            profil_afficher = true;

            //pour debugger
            //console.log("fonction clique_profil : !profil_afficher -> boucle else");
        }
    }

    //version dekstop
    else
    {
        if (verif_mode_paysage)
        {
            lien_profil_1.style.display = "none";
            profil_afficher = false;

            //pour debugger
            //console.log("fonction clique_profil : boucle else");
        }
    }
}

profil_1.addEventListener("click", clique_profil);


/*pour faire disparaitre le nom/prenom de l'utilisateur et l'option de deconnexion 
en appuyant sur la croix (mode portrait)*/
function clique_bouton_x_3()
{
    lien_profil_2.style.transform = "translateX(100%)";
    profil_afficher = false;

    //pour debugger
    //console.log("fonction clique_bouton_x_3");
}

bouton_x_3.addEventListener("click", clique_bouton_x_3);


/*pour faire disparaître les affichages du bouton profil/burger
lorsque l'on clique autre part dans la page que ces affichages (mode paysage)*/
function clique_page_1(cible)
{
    let verif_mode_paysage = window.matchMedia("(orientation: landscape)").matches;
    
    if 
    (
        lien_afficher/* == true*/ 
        && !lien_burger_2.contains(cible.target) 
        && !bouton_burger_1.contains(cible.target) 
        && verif_mode_paysage
        && window.innerHeight > 599
        && window.innerWidth > 599
    ) 
    {
        lien_burger_2.style.display = "none";
        lien_afficher = false;

        //pour debugger
        //console.log("clique_page_1 : lien_afficher");
    }

    if 
    (
        profil_afficher
        && !lien_profil_1.contains(cible.target) 
        && !profil_1.contains(cible.target)
        && verif_mode_paysage
        && window.innerHeight > 599
        && window.innerWidth > 599
    ) 
    {
        lien_profil_1.style.display = "none";
        profil_afficher = false;

        //pour debugger
        //console.log("clique_page_1 : profil_afficher");
    }
}

document.addEventListener("click", clique_page_1);


/*pour changer d'image d'ampoule dans la barre de recherche 
lorsque des caractères sont dans le champs de saisie de texte (paysage et portrait)*/
const ampoule_eteinte_1 = document.getElementById("ampoule_eteinte_1");
const ampoule_allumer_1 = document.getElementById("ampoule_allumer_1");
const barre_recherche_offre_1 = document.getElementById("barre_recherche_offre_1");
const barre_recherche_offre_2 = document.getElementById("barre_recherche_offre_2");
const ampoule_eteinte_2 = document.getElementById("ampoule_eteinte_2");
const ampoule_allumer_2 = document.getElementById("ampoule_allumer_2");

function allume_ampoule_paysage()
{
    if (barre_recherche_offre_1.value.length > 0)
    {
        ampoule_eteinte_1.style.visibility = "hidden";
        ampoule_eteinte_1.style.opacity = "0";
        ampoule_allumer_1.style.visibility = "visible";
        ampoule_allumer_1.style.opacity = "1";

        //pour debugger
        //console.log("allume_ampoule_paysage : if barre_recherche_offre_1");
    }

    else
    {
        ampoule_eteinte_1.style.visibility = "visible";
        ampoule_eteinte_1.style.opacity = "1";
        ampoule_allumer_1.style.visibility = "hidden";
        ampoule_allumer_1.style.opacity = "0";

        //pour debugger
        //console.log("allume_ampoule_paysage : else");
    }
}

function allume_ampoule_portrait()
{
    if (barre_recherche_offre_2.value.length > 0)
    {
        ampoule_eteinte_2.style.visibility = "hidden";
        ampoule_eteinte_2.style.opacity = "0";
        ampoule_allumer_2.style.visibility = "visible";
        ampoule_allumer_2.style.opacity = "1";

        //pour debugger
        //console.log("allume_ampoule_portrait : if barre_recherche_offre_2");
    }

    else
    {
        ampoule_eteinte_2.style.visibility = "visible";
        ampoule_eteinte_2.style.opacity = "1";
        ampoule_allumer_2.style.visibility = "hidden";
        ampoule_allumer_2.style.opacity = "0";

        //pour debugger
        //console.log("allume_ampoule_portrait : else");
    }
}

barre_recherche_offre_1.addEventListener("input", allume_ampoule_paysage);
barre_recherche_offre_2.addEventListener("input", allume_ampoule_portrait);


/*pour changer d'image de localisation dans la barre de recherche 
lorsque des caractères sont dans le champs de saisie de texte (paysage et portrait)*/
const localisation_eteinte_1 = document.getElementById("localisation_eteinte_1");
const localisation_allumer_1 = document.getElementById("localisation_allumer_1");
const barre_recherche_lieu_1 = document.getElementById("barre_recherche_lieu_1");
const barre_recherche_lieu_2 = document.getElementById("barre_recherche_lieu_2");
const localisation_eteinte_2 = document.getElementById("localisation_eteinte_2");
const localisation_allumer_2 = document.getElementById("localisation_allumer_2");

function allume_localisation_paysage()
{
    if (barre_recherche_lieu_1.value.length > 0)
    {
        localisation_eteinte_1.style.visibility = "hidden";
        localisation_eteinte_1.style.opacity = "0";
        localisation_allumer_1.style.visibility = "visible";
        localisation_allumer_1.style.opacity = "1";

        //pour debugger
        //console.log("allume_localisation_paysage : if barre_recherche_lieu_1");
    }

    else
    {
        localisation_eteinte_1.style.visibility = "visible";
        localisation_eteinte_1.style.opacity = "1";
        localisation_allumer_1.style.visibility = "hidden";
        localisation_allumer_1.style.opacity = "0";

        //pour debugger
        //console.log("allume_localisation_paysage : else");
    }
}

function allume_localisation_portrait()
{
    if (barre_recherche_lieu_2.value.length > 0)
    {
        localisation_eteinte_2.style.visibility = "hidden";
        localisation_eteinte_2.style.opacity = "0";
        localisation_allumer_2.style.visibility = "visible";
        localisation_allumer_2.style.opacity = "1";

        //pour debugger
        //console.log("allume_localisation_portrait : if barre_recherche_lieu_2");
    }

    else
    {
        localisation_eteinte_2.style.visibility = "visible";
        localisation_eteinte_2.style.opacity = "1";
        localisation_allumer_2.style.visibility = "hidden";
        localisation_allumer_2.style.opacity = "0";

        //pour debugger
        //console.log("allume_localisation_portrait : else");
    }
}


barre_recherche_lieu_1.addEventListener("input", allume_localisation_paysage);
barre_recherche_lieu_2.addEventListener("input", allume_localisation_portrait);


/*pour allumer/eteindre l'ombre derrière la barre de recherche lorsque 
le champs de saisie de texte est prêt à recevoir du texte (paysage)*/
const flex_container_recherche_2 = document.getElementById("flex_container_recherche_2");

function allumer_barre_recherche_paysage ()
{
    flex_container_recherche_2.style.boxShadow = "0vh 0vh 1vh 1vh rgb(242, 0, 255)";

    //pour debugger
    //console.log("allumer_barre_recherche_paysage");
}

function eteindre_barre_recherche_paysage ()
{
    flex_container_recherche_2.style.boxShadow = "0vh 0vh 0vh";

    //pour debugger
    //console.log("eteindre_barre_recherche_paysage");
}

barre_recherche_offre_1.addEventListener("focus", allumer_barre_recherche_paysage);
barre_recherche_offre_1.addEventListener("blur", eteindre_barre_recherche_paysage);
barre_recherche_lieu_1.addEventListener("focus", allumer_barre_recherche_paysage);
barre_recherche_lieu_1.addEventListener("blur", eteindre_barre_recherche_paysage);


/*pour allumer/eteindre l'ombre derrière la barre de recherche lorsque 
le champs de saisie de texte est prêt à recevoir du texte (portrait)*/
const flex_container_recherche_3 = document.getElementById("flex_container_recherche_3");
const flex_container_recherche_4 = document.getElementById("flex_container_recherche_4");

function allumer_barre_recherche_3 ()
{
    flex_container_recherche_3.style.boxShadow = "0vh 0vh 2vh #ffff00";

    //pour debugger
    //console.log("allumer_barre_recherche_paysage");
}

function eteindre_barre_recherche_3 ()
{
    flex_container_recherche_3.style.boxShadow = "0vh 0vh 0vh #ffff00";

    //pour debugger
    //console.log("eteindre_barre_recherche_paysage");
}

function allumer_barre_recherche_4 ()
{
    flex_container_recherche_4.style.boxShadow = "0vh 0vh 2vh #ffff00";

    //pour debugger
    //console.log("allumer_barre_recherche_paysage");
}

function eteindre_barre_recherche_4 ()
{
    flex_container_recherche_4.style.boxShadow = "0vh 0vh 0vh #ffff00";

    //pour debugger
    //console.log("eteindre_barre_recherche_paysage");
}

barre_recherche_offre_2.addEventListener("focus", allumer_barre_recherche_3);
barre_recherche_offre_2.addEventListener("blur", eteindre_barre_recherche_3);
barre_recherche_lieu_2.addEventListener("focus", allumer_barre_recherche_4);
barre_recherche_lieu_2.addEventListener("blur", eteindre_barre_recherche_4);


/*pour changer d'image de loupe lorsque la souris 
entre ou sort de l'image (paysage)*/
const loupe_recherche_1 = document.getElementById("loupe_recherche_1");
const loupe_recherche_3 = document.getElementById("loupe_recherche_3");

let loupe_recherche_1_afficher = true;
let loupe_recherche_3_afficher = false;

function allumer_loupe ()
{
    if (loupe_recherche_1_afficher)
    {
        loupe_recherche_1.style.display = "none";
        loupe_recherche_1_afficher = false;
        loupe_recherche_3.style.display = "flex";
        loupe_recherche_3_afficher = true;

        //pour debugger
        //console.log("allume_loupe : loupe_recherche_1_afficher");
    }

    else
    {
        loupe_recherche_1.style.display = "flex";
        loupe_recherche_1_afficher = true;
        loupe_recherche_3.style.display = "none";
        loupe_recherche_3_afficher = false;

        //pour debugger
        //console.log("allume_loupe : else");
    }
}

loupe_recherche_1.addEventListener("mouseenter", allumer_loupe);
loupe_recherche_3.addEventListener("mouseleave", allumer_loupe);


/*pour afficher/cacher la barre de recherche de stage 
en cliquant sur l'élément "recherche" ou ">>" (portrait)*/
const flex_container_recherche_8 = document.getElementById("flex_container_recherche_8");
const flex_container_recherche_6 = document.getElementById("flex_container_recherche_6");
const flex_container_recherche_7 = document.getElementById("flex_container_recherche_7");
const flex_container_filtre_portrait_1 = document.getElementById("flex_container_filtre_portrait_1");
const bouton_mode_recherche_2 = document.getElementById("bouton_mode_recherche_2");
const barre_secondaire = document.getElementById("barre_secondaire");

let section_recherche_afficher = false;

function affiche_recherhe()
{
    if (!section_recherche_afficher)
    {
        flex_container_recherche_8.style.transition = "transform 0.5s ease";
        flex_container_recherche_8.style.transform = "translateX(0%)";
        section_recherche_afficher = true;

        barre_secondaire.style.zIndex = "-1";
        flex_container_filtre_portrait_1.style.zIndex = "-1";

        //pour debugger
        //console.log("affiche_recherche : !section_recherche_afficher");
    }

    else
    {
        flex_container_recherche_8.style.transition = "transform 0.5s ease";
        flex_container_recherche_8.style.transform = "translateX(-100%)";
        section_recherche_afficher = false;

        setTimeout
        (
            function()
            {
                barre_secondaire.style.zIndex = "2";
                flex_container_filtre_portrait_1.style.zIndex = "2";
            }, 400
        );

        //pour debugger
        //console.log("affiche_recherche : else");
    }
}

flex_container_recherche_7.addEventListener("click", affiche_recherhe);
bouton_mode_recherche_2.addEventListener("click", affiche_recherhe);


/*pour afficher/cacher la barre de filtre en appuyant sur 
"filtre" ou "<<"*/
const flex_container_filtre_portrait_3 = document.getElementById("flex_container_filtre_portrait_3");
const bouton_mode_filtre_portrait_2 = document.getElementById("bouton_mode_filtre_portrait_2");

let section_filtre_afficher = false;

function affiche_filtre()
{
    if (!section_filtre_afficher)
    {
        flex_container_filtre_portrait_1.style.transition = "transform 0.5s ease";
        flex_container_filtre_portrait_1.style.transform = "translateX(0%)";
        section_filtre_afficher = true;

        barre_secondaire.style.zIndex = "-1";

        //pour debugger
        //console.log("affiche_filtre : !section_filtre_afficher");
    }

    else
    {
        flex_container_filtre_portrait_1.style.transition = "transform 0.5s ease";
        flex_container_filtre_portrait_1.style.transform = "translateX(100%)";
        section_filtre_afficher = false;

        setTimeout
        (
            function()
            {
                barre_secondaire.style.zIndex = "2";
            }, 400
        );

        //pour debugger
        //console.log("affiche_filtre : else");
    }
}

flex_container_filtre_portrait_3.addEventListener("click", affiche_filtre);
bouton_mode_filtre_portrait_2.addEventListener("click", affiche_filtre);


/*pour appliquer les fonctionnalités des switchs 
lorsque l'on clique sur celle-ci (paysage)*/
const switch_1 = document.getElementById("switch_1");
const switch_rond_1 = document.getElementById("switch_rond_1");
const switch_2 = document.getElementById("switch_2");
const switch_rond_2 = document.getElementById("switch_rond_2");
const section_filtre = document.getElementById("section_filtre");
const section_liste_offre = document.getElementById("section_liste_offre");
const liste_offre = document.getElementById("liste_offre");
const fenetre_offre = document.getElementsByClassName("fenetre_offre");
const main_offre = document.getElementById("main_offre");
const section_detaille_offre = document.getElementById("section_detaille_offre");

let mode_grille = false;
let mode_filtre = false;

function appuie_switch_1 ()
{
    if (!mode_grille)
    {
        switch_1.style.backgroundColor = "#da03e2";
        switch_rond_1.style.transform = "translateX(4vh)";
        mode_grille = true;

        main_offre.style.flexDirection = "column";
        //main_offre.style.justifyContent = "center";

        section_liste_offre.style.width = "90%";
        liste_offre.style.flexDirection = "row";
        liste_offre.style.flexWrap = "wrap";
        liste_offre.style.justifyContent = "center";

        for (let i = 0; i < fenetre_offre.length; i++) 
        {
            fenetre_offre[i].style.width = "31.5%";
        }

        section_detaille_offre.style.width = "90%";

        //pour debugger
        //console.log("appuie_switch_1 : mode_grille");
    }

    else
    {
        switch_1.style.backgroundColor = "#5500cc";
        switch_rond_1.style.transform = "translateX(0vh)";
        mode_grille = false;

        main_offre.style.flexDirection = "row";

        section_liste_offre.style.width = "40%";
        liste_offre.style.flexDirection = "column";
        liste_offre.style.flexWrap = "nowrap";
        liste_offre.style.justifyContent = "flex-start";
        
        for (let i = 0; i < fenetre_offre.length; i++) 
        {
            fenetre_offre[i].style.width = "100%";
        }

        section_detaille_offre.style.width = "40%";

        //pour debugger
        //console.log("appuie_switch_1 : else");
    }
}

function appuie_switch_2 ()
{
    if (!mode_filtre)
    {
        switch_2.style.backgroundColor = "#da03e2";
        switch_rond_2.style.transform = "translateX(4vh)";
        section_filtre.style.display = "block";
        mode_filtre = true;

        //pour debugger
        //console.log("appuie_switch_2 : mode_filtre");
    }

    else
    {
        switch_2.style.backgroundColor = "#5500cc";
        switch_rond_2.style.transform = "translateX(0vh)";
        section_filtre.style.display = "none";
        mode_filtre = false;

        //pour debugger
        //console.log("appuie_switch_2 : else");
    }
}

switch_1.addEventListener("click", appuie_switch_1);
switch_2.addEventListener("click", appuie_switch_2);


/*pour changer la couleur du titre à coté d'un bouton switch 
lorsque l'on passe la souris sur celle-ci*/
const description_switch_affichage_1 = document.getElementById("description_switch_affichage_1");
const description_switch_affichage_2 = document.getElementById("description_switch_affichage_2");

function allumer_titre_switch_1 ()
{
    description_switch_affichage_1.style.color = "#ffdd00";

    //pour debugger
    //console.log("allumer_titre_switch_1");
}

function eteindre_titre_switch_1 ()
{
    description_switch_affichage_1.style.color = "#000000";

    //pour debugger
    //console.log("eteindre_titre_switch_1");
}

function allumer_titre_switch_2 ()
{
    description_switch_affichage_2.style.color = "#ffdd00";

    //pour debugger
    //console.log("allumer_titre_switch_2");
}

function eteindre_titre_switch_2 ()
{
    description_switch_affichage_2.style.color = "#000000";

    //pour debugger
    //console.log("eteindre_titre_switch_2");
}

switch_1.addEventListener("mouseenter", allumer_titre_switch_1);
switch_1.addEventListener("mouseleave", eteindre_titre_switch_1);
switch_2.addEventListener("mouseenter", allumer_titre_switch_2);
switch_2.addEventListener("mouseleave", eteindre_titre_switch_2);


/*pour activer/désactiver la fenêtre de modification/création d'offre*/
const bouton_creer = document.getElementById("bouton_creer");
const contenaire_offre = document.getElementById("contenaire_offre");
const contenaire_offre_modifier = document.getElementById("contenaire_offre_modifier");
const contenaire_comfirmation_suppression = document.getElementById("contenaire_comfirmation_suppression");
const presentation_offre = document.getElementById("presentation_offre");
const presentation_offre_modifier = document.getElementById("presentation_offre_modifier");
const competence_offre = document.getElementById("competence_offre");
const competence_offre_modifier = document.getElementById("competence_offre_modifier");
const avantage_offre = document.getElementById("avantage_offre");
const avantage_offre_modifier = document.getElementById("avantage_offre_modifier");
const comfirmation_formulaire_offre = document.getElementById("comfirmation_formulaire_offre");
const bouton_modifier = document.getElementById("bouton_modifier");
const bouton_poubelle = document.getElementById("bouton_poubelle");
const bouton_annuler_suppresion = document.getElementById("bouton_annuler_suppresion");
const bouton_enregistrer = document.getElementById("bouton_enregistrer");
const bouton_annuler = document.getElementById("bouton_annuler");

function activer_creation_offre ()
{
    contenaire_offre.style.display = "none";
    contenaire_offre_modifier.style.display = "flex";
    presentation_offre.style.display = "none";
    presentation_offre_modifier.style.display = "flex";
    competence_offre.style.display = "none";
    competence_offre_modifier.style.display = "flex";
    avantage_offre.style.display = "none";
    avantage_offre_modifier.style.display = "flex";
    comfirmation_formulaire_offre.style.display = "flex";

    //pour debugger
    //console.log("activer_creation_offre");
}

function desactiver_creation_offre ()
{
    contenaire_offre.style.display = "block";
    contenaire_offre_modifier.style.display = "none";
    presentation_offre.style.display = "flex";
    presentation_offre_modifier.style.display = "none";
    competence_offre.style.display = "flex";
    competence_offre_modifier.style.display = "none";
    avantage_offre.style.display = "flex";
    avantage_offre_modifier.style.display = "none";
    comfirmation_formulaire_offre.style.display = "none";

    //pour debugger
    //console.log("desactiver_creation_offre");
}

function afficher_comfirmation_suppression ()
{
    contenaire_comfirmation_suppression.style.display = "block";
    contenaire_offre.style.display = "none";

    //pour debugger
    //console.log("afficher_comfirmation_suppression");
}

function annuler_comfirmation_suppression ()
{
    contenaire_comfirmation_suppression.style.display = "none";
    contenaire_offre.style.display = "block";

    //pour debugger
    //console.log("annuler_comfirmation_suppression");
}

bouton_creer.addEventListener("click", activer_creation_offre);
bouton_modifier.addEventListener("click", activer_creation_offre);
bouton_poubelle.addEventListener("click", afficher_comfirmation_suppression);
bouton_annuler_suppresion.addEventListener("click", annuler_comfirmation_suppression);
//bouton_enregistrer.addEventListener("click", desactiver_creation_offre);
bouton_annuler.addEventListener("click", desactiver_creation_offre);


/*pour obliger l'utilisateur à choisir au moins une langue 
lors de la création/modification d'une offre*/
//const formulaire_offre = document.getElementById("formulaire_offre");
const bouton_checkbox_modifier = document.querySelectorAll(".bouton_checkbox_modifier");
//const bouton_enregistrer = document.getElementById("bouton_enregistrer");
//const bouton_comfirmer_suppression = document.getElementById("bouton_comfirmer_suppression");
const message_erreur_offre = document.getElementById("message_erreur_offre");

function verif_langue_cocher (event)
{
    let case_cocher = false;

    bouton_checkbox_modifier.forEach 
    (
        function (checkbox)
        {
            if (checkbox.checked)
            {
                case_cocher = true;
            }
        }
    );
    
    /*for (let i =0; i < bouton_checkbox_modifier.length; i++)
    {
        if (bouton_checkbox_modifier[i].checked)
        {
            case_cocher = true;
        }
    }*/

    if (!case_cocher)
    {
        event.preventDefault();
        message_erreur_offre.innerHTML = "Veuillez cocher au moins une langue !"
        //alert("Veuillez sélectionné au moins une langue !");
    }
}

bouton_enregistrer.addEventListener("click", verif_langue_cocher);
//formulaire_offre.addEventListener("submit", verif_langue_cocher);
//bouton_comfirmer_suppression.addEventListener("click", ver)


/*pour activer/desactiver la fenêtre de candidature*/
const bouton_postuler = document.getElementById("bouton_postuler");
const candidature_offre = document.getElementById("candidature_offre");
const resumer_offre = document.getElementById("resumer_offre");
//const bouton_envoyer_candidature = document.getElementById("bouton_envoyer_candidature");
const bouton_annuler_candidature = document.getElementById("bouton_annuler_candidature");


function activer_candidature ()
{
    resumer_offre.style.display = "none";
    presentation_offre.style.display = "none";
    competence_offre.style.display = "none";
    avantage_offre.style.display = "none";
    candidature_offre.style.display = "block";

    //pour debugger
    //console.log("activer_candidature");
}

function desactiver_candidature ()
{
    resumer_offre.style.display = "block";
    presentation_offre.style.display = "flex";
    competence_offre.style.display = "flex";
    avantage_offre.style.display = "flex";
    candidature_offre.style.display = "none";

    //pour debugger
    //console.log("desactiver_candidature");
}

bouton_postuler.addEventListener("click", activer_candidature);
bouton_annuler_candidature.addEventListener("click", desactiver_candidature);


/*pour vérifier que les données soient conforme aux formulaires*/
const champ_ville = document.getElementById("champ_ville");
const formulaire_candidature = document.getElementById("formulaire_candidature");
const champ_nom_candidature = document.getElementById("champ_nom_candidature");
const champ_prenom_candidature = document.getElementById("champ_prenom_candidature");
const champ_adresse_mail_candidature = document.getElementById("champ_adresse_mail_candidature");
const champ_ville_candidature = document.getElementById("champ_ville_candidature");
const champ_numero_telephone_candidature = document.getElementById("champ_numero_telephone_candidature");
const message_erreur_candidature = document.getElementById("message_erreur_candidature");

let validation_champ_ville, validation_champ_nom_candidature,
validation_champ_prenom_candidature, validation_champ_adresse_mail_candidature,
validation_champ_ville_candidature, validation_champ_numero_telephone_candidature = false;

// pour vérifier que la ville est bien saisie (formulaire créer/modifier)
function verif_ville(event)
{
    // que des lettres accentué (minuscule et majuscule)
    const ville_valider = /^[\p{L} -]+$/u;
    let valeur_champ_ville = champ_ville.value;

    if (ville_valider.test(valeur_champ_ville))
    {
        validation_champ_ville = true;

        // pour debugger
        //console.log("verif_ville : if (ville_valid.test(valeur_champ_ville))");
        //console.log("ville valide = " + valeur_champ_ville);
    }
    
    else
    {
        message_erreur_offre.innerHTML = "Veuillez saisir un nom de ville valide !"
        validation_champ_ville = false;
        event.preventDefault();

        // pour debugger
        //console.log("verif_ville : else");
        //console.log("ville invalide = " + valeur_champ_ville);
    }
}

// pour vérifier que le nom est bien saisie (formulaire candidature)
function verif_nom_candidature(event)
{
    // que des lettres accentué (minuscule et majuscule)
    const nom_candidature_valider = /^[\p{L} -]+$/u;
    let valeur_champ_nom_candidature = champ_nom_candidature.value;

    if (nom_candidature_valider.test(valeur_champ_nom_candidature))
    {
        validation_champ_nom_candidature = true;

        // pour debugger
        //console.log("verif_nom_candidature : if (nom_candidature_valider.test(valeur_champ_nom_candidature))");
        //console.log("nom valide = " + valeur_champ_nom_candidature);
    }
    
    else
    {
        message_erreur_candidature.innerHTML = "Veuillez saisir un nom valide !"
        validation_champ_nom_candidature = false;
        event.preventDefault();

        // pour debugger
        //console.log("verif_nom_candidature : else");
        //console.log("nom invalide = " + valeur_champ_nom_candidature);
    }
}

// pour vérifier que le prénom est bien saisie (formulaire candidature)
function verif_prenom_candidature(event)
{
    // que des lettres accentué (minuscule et majuscule)
    const prenom_candidature_valider = /^[\p{L} -]+$/u;
    let valeur_champ_prenom_candidature = champ_prenom_candidature.value;

    if (prenom_candidature_valider.test(valeur_champ_prenom_candidature))
    {
        validation_champ_prenom_candidature = true;

        // pour debugger
        //console.log("verif_prenom_candidature : if (prenom_candidature_valider.test(valeur_champ_prenom_candidature))");
        //console.log("prenom valide = " + valeur_champ_prenom_candidature);
    }
    
    else
    {
        message_erreur_candidature.innerHTML = "Veuillez saisir un prenom valide !"
        validation_champ_prenom_candidature = false;
        event.preventDefault();

        // pour debugger
        //console.log("verif_prenom_candidature : else");
        //console.log("prenom invalide = " + valeur_champ_prenom_candidature);
    }
}

// pour vérifier que l'adresse mail est bien saisie (formulaire candidature)
function verif_mail_candidature(event)
{
    // que des caractères alphanumérique (minuscule et majuscule) + les caractères suivante : "_", "." et "-"
    const adresse_mail_candidature_valider = /[\w_.-]+@[a-zA-Z_-]+\.[a-zA-Z]/; 
    let valeur_champ_adresse_mail_candidature = champ_adresse_mail_candidature.value;

    if (adresse_mail_candidature_valider.test(valeur_champ_adresse_mail_candidature))
    {
        validation_champ_adresse_mail_candidature = true;

        // pour debugger
        //console.log("verif_mail_candidature : if (adresse_mail_candidature_valider.test(valeur_champ_adresse_mail_candidature))");
        //console.log("adresse mail valide = " + valeur_champ_adresse_mail_candidature);
    }
    
    else
    {
        message_erreur_candidature.innerHTML = "Veuillez saisir une adresse mail valide !"
        validation_champ_adresse_mail_candidature = false;
        event.preventDefault();

        // pour debugger
        //console.log("verif_mail_candidature : else");
        //console.log("adresse mail invalide = " + valeur_champ_adresse_mail_candidature);
    }
}

// pour vérifier que la ville est bien saisie (formulaire candidature)
function verif_ville_candidature(event)
{
    // que des lettres accentué (minuscule et majuscule)
    const ville_candidature_valider = /^[\p{L} -]+$/u;
    let valeur_champ_ville_candidature = champ_ville_candidature.value;

    if (ville_candidature_valider.test(valeur_champ_ville_candidature))
    {
        validation_champ_ville_candidature = true;

        // pour debugger
        //console.log("verif_ville_candidature : if (ville_candidature_valider.test(valeur_champ_ville_candidature))");
        //console.log("ville valide = " + valeur_champ_ville_candidature);
    }
    
    else
    {
        message_erreur_candidature.innerHTML = "Veuillez saisir un nom de ville valide !"
        validation_champ_ville_candidature = false;
        event.preventDefault();

        // pour debugger
        //console.log("verif_nom : else");
        //console.log("Nom invalide = " + valeur_champ_ville);
    }
}

// pour vérifier que l'adresse mail est bien saisie (formulaire candidature)
function verif_numero_telephone_candidature(event)
{
    // que des chiffres de 0 à 9 avec un numéro qui commence par *0[0 à 9]* suivi de 8 chiffres supplémentaire
    const numero_telephone_candidature_valider = /^0[1-9]\d{8}$/; 
    let valeur_champ_numero_telephone_candidature = champ_numero_telephone_candidature.value;

    if (numero_telephone_candidature_valider.test(valeur_champ_numero_telephone_candidature))
    {
        validation_champ_numero_telephone_candidature = true;

        // pour debugger
        //console.log("verif_numero_telephone_candidature : if (numero_telephone_candidature_valider.test(valeur_champ_numero_telephone_candidature))");
        //console.log("numéro de téléphone valide = " + valeur_champ_numero_telephone_candidature);
    }
    
    else
    {
        message_erreur_candidature.innerHTML = "Veuillez saisir un numéro de téléphone valide !"
        validation_champ_numero_telephone_candidature = false;
        event.preventDefault();

        // pour debugger
        //console.log("verif_numero_telephone_candidature : else");
        //console.log("numéro de téléphone invalide = " + valeur_champ_numero_telephone_candidature);
    }
}

bouton_enregistrer.addEventListener("click", verif_ville);
formulaire_candidature.addEventListener("submit", verif_nom_candidature);
formulaire_candidature.addEventListener("submit", verif_prenom_candidature);
formulaire_candidature.addEventListener("submit", verif_mail_candidature);
formulaire_candidature.addEventListener("submit", verif_ville_candidature);
formulaire_candidature.addEventListener("submit", verif_numero_telephone_candidature);


/*pour detecter l'orientation de l'affichage (paysage ou portrait)*/
const section_recherche = document.getElementById("section_recherche");

function changement_mode() 
{
    let verif_mode_paysage = window.matchMedia("(orientation: landscape)").matches;

    //passage en mode paysage
    if (verif_mode_paysage) 
    {
        if (profil_afficher || lien_afficher)
        {
            lien_profil_1.style.display = "none";
            profil_afficher = false;
            lien_burger_2.style.display = "none";
            lien_afficher = false;

            //pour debugger
            //console.log("changement_mode : verif_mode -> profil_afficher || lien_afficher");
        }

        if (window.innerHeight < 600 && window.innerWidth < 940)
        {
            lien_profil_2.style.display = "flex";
            lien_burger_1.style.display = "flex";
        }

        else 
        {
            lien_profil_2.style.display = "none";
            lien_burger_1.style.display = "none";
        }

        lien_profil_1.style.boxShadow = "0vh 0vh 2vh #ffff00;";
        lien_profil_2.style.boxShadow = "0vh 0vh 2vh #ffff00;";
        lien_burger_1.style.boxShadow = "0vh 0vh 2vh #ffff00";
        lien_burger_2.style.boxShadow = "0vh 0vh 2vh #ffff00";

        section_recherche.style.position = "relative";
        section_recherche.style.marginTop = "12vh";
        section_recherche.style.height = "100%";

        flex_container_recherche_8.style.display = "none";
        flex_container_filtre_portrait_1.style.display = "none";

        barre_secondaire.style.position = "relative";
        barre_secondaire.style.marginTop = "1.5vh";

        main_offre.style.flexDirection = "row";

        section_liste_offre.style.width = "40%";
        section_detaille_offre.style.width = "40%";

        //pour debugger
        //console.log("L'écran est maintenant en mode paysage");
    }

    //passage en mode portrait
    else 
    {
        lien_profil_1.style.display = "none";
        lien_profil_2.style.display = "flex";
        profil_afficher = false;

        lien_burger_2.style.display = "none";
        lien_burger_1.style.display = "flex";
        lien_afficher = false;

        section_recherche.style.position = "fixed";
        section_recherche.style.top = "10%";
        section_recherche.style.marginTop = "0vh";
        section_recherche.style.height = "0%";

        flex_container_recherche_8.style.display = "flex";
        flex_container_filtre_portrait_1.style.display = "flex";

        switch_2.style.backgroundColor = "#5500cc";
        switch_rond_2.style.transform = "translateX(0vh)";
        section_filtre.style.display = "none"
        mode_filtre = false;

        barre_secondaire.style.position = "fixed";
        barre_secondaire.style.marginTop = "21vh";

        switch_1.style.backgroundColor = "#5500cc";
        switch_rond_1.style.transform = "translateX(0vh)";

        main_offre.style.flexDirection = "column";

        section_liste_offre.style.width = "90%";
        liste_offre.style.width = "100%";
        liste_offre.style.flexDirection = "column";
        liste_offre.style.flexWrap = "nowrap";
        
        for (let i = 0; i < fenetre_offre.length; i++) 
        {
            fenetre_offre[i].style.width = "100%";
        }

        section_detaille_offre.style.width = "90%";

        mode_grille = false;

        //pour debugger
        //console.log("changement_mode : boucle else");
        //console.log("L'écran est maintenant en mode portrait");
    }

    document.body.classList.add("desactivation_transition");

    setTimeout 
    (
        function ()
        {
            document.body.classList.remove("desactivation_transition");
        }, 200
    );
}

changement_mode();
mode_portrait.addEventListener("change", changement_mode);
