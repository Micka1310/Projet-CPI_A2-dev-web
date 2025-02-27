/*JS de l'en-tete pour le projet dev web à CESI*/

const bouton_burger_1 = document.getElementById("bouton_burger_1");
const bouton_burger_2 = document.getElementById("bouton_burger_2");
const lien_burger_2 = document.getElementById("lien_burger_2");
const lien_profil = document.getElementById("lien_profil_1");
const profil_1 = document.getElementById("profil_1");
const profil_2 = document.getElementById("profil_2");
const bouton_x_1 = document.getElementById("x_1");
const bouton_x_2 = document.getElementById("x_2");

let profil_afficher = false;
let lien_afficher = false;


/*pour faire apparaître/disparaitre les liens secondaires du bouton burger 
en appuyant sur le bouton burger (dekstop)*/
function clique_burger_1()
{
    if (lien_afficher == false)
    {
        if (window.innerWidth > 899)
        {
            lien_burger_2.style.display = "flex";
            lien_burger_2.style.width = "auto"
            lien_profil.style.display = "none";
            lien_afficher = true;
            profil_afficher = false;
            console.log("fonction clique_burger_1 : boucle if ('lien_afficher == false) -> boucle (window.innerWidth > 899)");
        }

        else
        {
            lien_burger_2.style.transform = "translateX(0%)";
            lien_afficher = true;
            console.log("fonction clique_burger_1 : boucle if (lien_afficher == false) -> boucle else");
        }
    }

    else
    {
        if (window.innerWidth > 899)
        {
            lien_burger_2.style.display = "none";
            lien_afficher = false;
            console.log("fonction clique_burger_1 : boucle else -> boucle if (window.innerWidth > 899)");
        }
    }
}

bouton_burger_1.addEventListener("click", clique_burger_1);


/*pour faire apparaître/disparaitre les liens secondaires du bouton burger 
en appuyant sur le bouton burger (mobile)*/
bouton_burger_2.addEventListener("click", clique_burger_1);


/*pour faire disparaitre les liens secondaires du bouton burger 
en appuyant sur la croix*/
function clique_bouton_x_2()
{
    lien_burger_2.style.transform = "translateX(100%)";
    lien_afficher = false;
    console.log("fonction clique_bouton_x_2");
}

bouton_x_2.addEventListener("click", clique_bouton_x_2);


/*pour faire apparaître/disparaitre le nom/prenom de l'utilisateur et l'option 
de deconnexion en appuyant sur le profil (dekstop)*/
function clique_profil()
{
    if (profil_afficher == false)
    {
        if (window.innerWidth > 899)
        {
            lien_profil.style.display = "flex";
            lien_burger_2.style.display = "none";
            profil_afficher = true;
            lien_afficher = false;
            console.log("fonction clique_profil : boucle if (profil_afficher == false) -> if (window.innerWidth > 899)");
        }

        else
        {
            lien_profil.style.transform = "translateX(0%)";
            profil_afficher = true;
            console.log("fonction clique_profil : boucle if (lien_afficher == false) -> boucle else");
        }
    }

    else
    {
        if (window.innerWidth > 899)
        {
            lien_profil.style.display = "none";
            profil_afficher = false;
            console.log("fonction clique_profil : else");
        }
    }
}

profil_1.addEventListener("click", clique_profil);


/*pour faire apparaître/disparaitre le nom/prenom de l'utilisateur et l'option 
de deconnexion en appuyant sur le profil (mobile)*/
profil_2.addEventListener("click", clique_profil);


/*pour faire disparaitre le nom/prenom de l'utilisateur et l'option de deconnexion 
en appuyant sur la croix (mobile)*/
function clique_bouton_x_1()
{
    lien_profil.style.transform = "translateX(100%)";
    profil_afficher = false;
    console.log("fonction clique_bouton_x_1");
}

bouton_x_1.addEventListener("click", clique_bouton_x_1);


/*pour faire disparaître les affichages du bouton profil/burger
lorsque l'on clique autre part dans la page que ces affichages (dekstop)*/
function clique_page_1 (cible)
{
    if 
    (
        lien_afficher == true 
        && !lien_burger_2.contains(cible.target) 
        && !bouton_burger_1.contains(cible.target) 
        && !bouton_burger_2.contains(cible.target)
        && window.innerWidth > 899
    ) 
    {
        lien_burger_2.style.display = "none";
        lien_afficher = false;
        console.log("clique_page_1 : if (lien_afficher == true)");
    }

    if 
    (
        profil_afficher == true 
        && !lien_profil.contains(cible.target) 
        && !profil_1.contains(cible.target)
        && window.innerWidth > 899
    ) 
    {
        lien_profil.style.display = "none";
        profil_afficher = false;
        console.log("clique_page_1 : if (profil_afficher == true)");
    }
}

document.addEventListener("click", clique_page_1);