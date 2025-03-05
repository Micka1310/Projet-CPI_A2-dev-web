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
            console.log("fonction clique_burger_1 : !lien_afficher -> verif_mode_paysage && height < 600 && width < 940");
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
            console.log("fonction clique_burger_1 : !lien_afficher -> verif_mode_paysage");
        }

        //version mobile
        else
        {
            lien_burger_1.style.transform = "translateX(0%)";
            lien_afficher = true;
            //pour debugger
            console.log("fonction clique_burger_1 : !lien_afficher -> boucle else");
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
            console.log("fonction clique_burger_1 : boucle else -> verif_mode_paysage");
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
    console.log("fonction clique_bouton_x_2");
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
            console.log("fonction clique_profil : !profil_afficher -> verif_mode_paysage && height < 600 && width < 940");
        }

        //version dekstop
        else if (verif_mode_paysage)
        {
            lien_profil_1.style.display = "flex";
            lien_burger_2.style.display = "none";
            profil_afficher = true;
            lien_afficher = false;
            //pour debugger
            console.log("fonction clique_profil : !profil_afficher -> verif_mode_paysage");
        }

        //version mobile
        else
        {
            lien_profil_2.style.transform = "translateX(0%)";
            profil_afficher = true;
            //pour debugger
            console.log("fonction clique_profil : !profil_afficher -> boucle else");
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
            console.log("fonction clique_profil : boucle else");
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
    console.log("fonction clique_bouton_x_3");
}

bouton_x_3.addEventListener("click", clique_bouton_x_3);


/*pour faire disparaître les affichages du bouton profil/burger
lorsque l'on clique autre part dans la page que ces affichages (mode paysage)*/
function clique_page_1 (cible)
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
        console.log("clique_page_1 : lien_afficher");
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
        console.log("clique_page_1 : profil_afficher");
    }
}

document.addEventListener("click", clique_page_1);


/*pour changer d'image d'ampoule dans la barre de recherche 
lorsque la souris et sur l'image (paysage et portrait)*/
const ampoule_eteinte_1 = document.getElementById('ampoule_eteinte_1');
const ampoule_allumer_1 = document.getElementById('ampoule_allumer_1');
const barre_recherche_offre_1 = document.getElementById("barre_recherche_offre_1");
const barre_recherche_offre_2 = document.getElementById("barre_recherche_offre_2");
const ampoule_eteinte_2 = document.getElementById('ampoule_eteinte_2');
const ampoule_allumer_2 = document.getElementById('ampoule_allumer_2');

function allume_ampoule ()
{
    if (barre_recherche_offre_1.value.length > 0 || barre_recherche_offre_2.value.length > 0)
    {
        ampoule_eteinte_1.style.visibility = "hidden";
        ampoule_eteinte_1.style.opacity = "0";
        ampoule_allumer_1.style.visibility = "visible";
        ampoule_allumer_1.style.opacity = "1";
        ampoule_eteinte_2.style.visibility = "hidden";
        ampoule_eteinte_2.style.opacity = "0";
        ampoule_allumer_2.style.visibility = "visible";
        ampoule_allumer_2.style.opacity = "1";
        //pour debugger
        //console.log("allume_ampoule : if barre_recherche_offre_1");
    }

    else
    {
        ampoule_eteinte_1.style.visibility = "visible";
        ampoule_eteinte_1.style.opacity = "1";
        ampoule_allumer_1.style.visibility = "hidden";
        ampoule_allumer_1.style.opacity = "0";
        ampoule_eteinte_2.style.visibility = "visible";
        ampoule_eteinte_2.style.opacity = "1";
        ampoule_allumer_2.style.visibility = "hidden";
        ampoule_allumer_2.style.opacity = "0";
        //pour debugger
        //console.log("allume_ampoule : else");
    }
}

barre_recherche_offre_1.addEventListener("input", allume_ampoule);
barre_recherche_offre_2.addEventListener("input", allume_ampoule);


/*pour afficher/cacher la barre de recherche de stage 
en cliquant sur l'élément "recherche" ou ">" (portrait)*/
const flex_container_recherche_1 = document.getElementById("flex_container_recherche_1");
const flex_container_recherche_6 = document.getElementById("flex_container_recherche_6");
const flex_container_recherche_7 = document.getElementById("flex_container_recherche_7");
const bouton_mode_recherche_2 = document.getElementById("bouton_mode_recherche_2");

let section_recherche_afficher = false;

function affiche_recherhe()
{
    if (!section_recherche_afficher)
    {
        flex_container_recherche_1.style.transition = "transform 0.5s ease"
        flex_container_recherche_1.style.transform = "translateX(0%)";
        section_recherche_afficher = true;
        //pour debugger
        console.log("affiche_recherche : !section_recherche_afficher");
    }

    else
    {
        flex_container_recherche_1.style.transition = "transform 0.5s ease"
        flex_container_recherche_1.style.transform = "translateX(-100%)";
        section_recherche_afficher = false;
        //pour debugger
        console.log("affiche_recherche : else");
    }
}

flex_container_recherche_7.addEventListener("click", affiche_recherhe);
bouton_mode_recherche_2.addEventListener("click", affiche_recherhe);


/*pour detecter l'orientation de l'affichage (paysage ou portrait)*/
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
            console.log("changement_mode : verif_mode -> profil_afficher || lien_afficher");
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

        lien_profil_1.style.boxShadow = "0vh 0vh 1.25vh #ff0000;";
        lien_profil_2.style.boxShadow = "0vh 0vh 1.25vh #ff0000;";
        lien_burger_1.style.boxShadow = "0vh 0vh 1.25vh #0099ff";
        lien_burger_2.style.boxShadow = "0vh 0vh 1.25vh #0099ff";
        //pour debugger
        console.log("L'écran est maintenant en mode paysage");
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
        lien_profil_1.style.boxShadow = "0vh 0vh 0vh;";
        lien_profil_2.style.boxShadow = "0vh 0vh 0vh";
        lien_burger_1.style.boxShadow = "0vh 0vh 0vh";
        lien_burger_2.style.boxShadow = "0vh 0vh 0vh";
        //pour debugger
        console.log("changement_mode : boucle else");
        console.log("L'écran est maintenant en mode portrait");
    }
}

changement_mode();
mode_portrait.addEventListener("change", changement_mode);