/*pour faire apparaître/disparaitre les liens secondaires du bouton burger 
en appuyant sur le bouton burger (dekstop)*/
const bouton_burger_1 = document.getElementById("bouton_burger_1");
const lien_burger_2 = document.getElementById("lien_burger_2");
let lien_afficher = false;

function clique_burger_1()
{
    if (lien_afficher == false)
    {
        lien_burger_2.style.display = "flex";
        lien_afficher = true;
        console.log("fonction clique_burger_1 : boucle \'==false\'");
    }

    else
    {
        lien_burger_2.style.display = "none";
        lien_afficher = false;
        console.log("fonction clique_burger_1 : boucle \'else\'");
    }
}

bouton_burger_1.addEventListener("click", clique_burger_1);


/*pour faire apparaître/disparaitre les liens secondaires du bouton burger 
en appuyant sur le bouton burger (mobile)*/
const bouton_burger_2 = document.getElementById("bouton_burger_2");

bouton_burger_2.addEventListener("click", clique_burger_1);


/*pour faire disparaitre les liens secondaires du bouton burger 
en appuyant sur la croix*/
const bouton_x_2 = document.getElementById("x_2");

function clique_bouton_x_2()
{
    lien_burger_2.style.display = "none";
    lien_afficher = false;
    console.log("fonction clique_bouton_x_2");
}

bouton_x_2.addEventListener("click", clique_bouton_x_2);


/*pour faire apparaître/disparaitre le nom/prenom de l'utilisateur et l'option 
de deconnexion en appuyant sur le profil (dekstop)*/
const profil = document.getElementById("profil");
const lien_profil = document.getElementById("lien_profil_1");

let profil_afficher = false;

function clique_profil()
{
    if (profil_afficher == false)
    {
        lien_profil.style.display = "flex";
        profil_afficher = true;
        console.log("fonction clique_profil : \'==false\'");
    }

    else
    {
        lien_profil.style.display = "none";
        profil_afficher = false;
        console.log("fonction clique_profil : \'else\'");
    }
}

profil.addEventListener("click", clique_profil);


/*pour faire disparaitre le nom/prenom de l'utilisateur et l'option de deconnexion 
en appuyant sur la croix*/
const bouton_x_1 = document.getElementById("x_1");

function clique_bouton_x_1()
{
    lien_profil.style.display = "none";
    profil_afficher = false;
    console.log("fonction clique_bouton_x_1");
}

bouton_x_1.addEventListener("click", clique_bouton_x_1);