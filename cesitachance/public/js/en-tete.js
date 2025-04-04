/*JS de l'en-tete pour le projet dev web à CESI*/

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
        //pour debugger
        //console.log("changement_mode : boucle else");
        //console.log("L'écran est maintenant en mode portrait");
    }
}

changement_mode();
mode_portrait.addEventListener("change", changement_mode);




/****************  SESSION & Login Gestion ******************** */


localStorage.setItem("previousPage", window.location.href);




document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalConnexion");
    const openBtn = document.querySelector("#connexion");
    const closeBtn = document.querySelector(".modal .close");

    if (modal && openBtn && closeBtn) {
        // 🟢 Ouvre la modale
        openBtn.addEventListener("click", function (event) {
            event.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden";

        });

        // 🔴 Ferme la modale avec la croix
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
            document.body.style.overflow = "auto";

        });

        // 🔴 Ferme la modale si on clique à l’extérieur du contenu
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
    
            }
        });
    }

    // 🔐 Vérifie si l'utilisateur est connecté
    fetch("/app/Controllers/auth_controller.php?action=check", {
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
        const loginLink = document.querySelector("#connexion");
        const profil1 = document.querySelector("#profil_1");
        const lienProfil1 = document.querySelector("#lien_profil_1");
        const lienProfil2 = document.querySelector("#lien_profil_2");
        const tooltipProfil = document.querySelector("#tooltip_profil");
        const boutonBurger = document.querySelector("#bouton_burger_1");
    
        const userRole = data.user?.Permission ?? "";
    
        if (data.connected) {
            if (loginLink) loginLink.style.display = "none";
            if (profil1) profil1.style.display = "flex";
            if (tooltipProfil) tooltipProfil.style.display = "inline";
            if (boutonBurger) boutonBurger.style.display = "block";
    
            // 🔍 Cacher les liens non autorisés
            document.querySelectorAll("[data-role]").forEach(link => {
                const rolesAutorises = link.getAttribute("data-role").split(",").map(r => r.trim());
                if (!rolesAutorises.includes(userRole)) {
                    link.style.display = "none";
                }
            });
    
            // Nom / prénom
            const nom = data.user.Nom_Utilisateur ?? "";
            const prenom = data.user.Prenom_Utilisateur ?? "";
            document.querySelector("#nom_prenom_lien_profil_1").innerHTML = `<span><b>${nom}</b> <b>${prenom}</b></span>`;
            document.querySelector("#nom_prenom_lien_profil_2").innerHTML = `<span><b>${nom}</b> <b>${prenom}</b></span>`;
    
        } else {
            if (loginLink) loginLink.style.display = "block";
            if (profil1) profil1.style.display = "none";
            if (tooltipProfil) tooltipProfil.style.display = "none";
            if (boutonBurger) boutonBurger.style.display = "none";
    
            document.querySelectorAll("[data-role]").forEach(link => {
                link.style.display = "none";
            });
        }
    
        // ✅ ✅ Affichage conditionnel de la notif APRÈS vérification du statut
        const notif = localStorage.getItem("accessDenied");
        if (notif) {
            const div = document.getElementById("notification");
            div.innerText = notif;
            div.style.display = "block";
    
            setTimeout(() => {
                div.style.display = "none";
                localStorage.removeItem("accessDenied");
            }, 2000);
        }

        const success = localStorage.getItem("successMessage");
        if (success) {
            const successDiv = document.getElementById("success-notification");
            successDiv.innerText = success;
            successDiv.style.display = "block";
        
            setTimeout(() => {
                successDiv.style.display = "none";
                localStorage.removeItem("successMessage");
            }, 2000);
        }
    });

    // 🔁 Déconnexion
    document.querySelectorAll(".lien_deconnexion").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            fetch("/app/Controllers/auth_controller.php?action=logout", {
                credentials: "include"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "success") {
                        localStorage.removeItem("previousPage");
                        localStorage.setItem("successMessage", "✅ Déconnexion réussie");
                        window.location.reload();
                    }
                });
        });
    });
});


/* ***************************************************** */