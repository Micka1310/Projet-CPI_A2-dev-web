let entreprises = [];
let entreprisesAffichees = [];
let entrepriseSelectionnee = null;

let pageActuelle = 1;
const entreprisesParPage = 6;

const container = document.querySelector("#offresContainer");
const detailSection = document.querySelector(".company-details");
const companyList = document.querySelector(".company-list");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

fetch('/app/Controllers/EntrepriseController.php?action=getAll') 
  .then(response => response.json())
  .then(data => {
    entreprises = data;

    const filtreSpecialite = document.getElementById("filtreSpecialite");
    const filtreLieu = document.getElementById("filtreLieu");
    const filtreDate = document.getElementById("filtreDate");
    const filtreType = document.getElementById("filtreType");
    const filtreStagesPostules = document.getElementById("filtreStagesPostules");

    function appliquerFiltres() {
      const specialiteChoisie = filtreSpecialite.value;
      const lieuChoisi = filtreLieu.value;
      const dateChoisie = filtreDate.value;
      const typeChoisi = filtreType.value;
      const stagesChoisis = filtreStagesPostules.value;

      const maintenant = new Date();

      const entreprisesFiltrees = entreprises.filter(ent => {
        const matchSpecialite = !specialiteChoisie || ent.Specialite === specialiteChoisie;
        const matchLieu = !lieuChoisi || ent.Region === lieuChoisi;
        const matchType = !typeChoisi || ent.Type_Entreprise === typeChoisi;

        let matchDate = true;
        if (dateChoisie && dateChoisie !== "Aucun") {
          const datePubli = new Date(ent.Date_Publication);
          const diffJours = (maintenant - datePubli) / (1000 * 3600 * 24);
          matchDate = diffJours <= parseInt(dateChoisie);
        }

        let matchStages = true;
        if (stagesChoisis) {
          const [min, max] = stagesChoisis.split('-').map(Number);
          matchStages = ent.Nb_Stagiaires_Postules >= min && ent.Nb_Stagiaires_Postules <= max;
        }

        return matchSpecialite && matchLieu && matchDate && matchType && matchStages;
      });

      entreprisesAffichees = entreprisesFiltrees;
      pageActuelle = 1;
      afficherPage(pageActuelle, entreprisesAffichees);
    }

    filtreSpecialite.addEventListener("change", appliquerFiltres);
    filtreLieu.addEventListener("change", appliquerFiltres);
    filtreDate.addEventListener("change", appliquerFiltres);
    filtreType.addEventListener("change", appliquerFiltres);
    filtreStagesPostules.addEventListener("change", appliquerFiltres);

    entreprisesAffichees = entreprises;
    afficherPage(1, entreprisesAffichees);
  });

function afficherPage(numPage, liste = entreprises) {
  container.innerHTML = "";

  const debut = (numPage - 1) * entreprisesParPage;
  const fin = debut + entreprisesParPage;
  const pageEntreprises = liste.slice(debut, fin);

  pageEntreprises.forEach(entreprise => {
    const card = document.createElement("div");
    card.className = "company-card";
    card.innerHTML = `
      <img src="${entreprise.logo}" alt="Logo ${entreprise.Nom}">
      <h3>${entreprise.Nom}</h3>
      <a href="${entreprise.url}" class="btn-site" target="_blank">Visiter le site</a>
    `;

    card.addEventListener("click", () => {
      entrepriseSelectionnee = entreprise;
      detailSection.style.display = "block";
      companyList.classList.remove("full-width");

      const desc = entreprise.Description
        ? entreprise.Description.replace(/\\n/g, "<br>").replace(/\n/g, "<br>")
        : "";

      detailSection.innerHTML = `
        <h2>${entreprise.Nom}</h2><br>
        <p><strong>Ville :</strong> ${entreprise.Adresse}</p><br>
        <p><strong>Spécialité :</strong> ${entreprise.Domaine}</p><br>
        <p><strong>Email :</strong> ${entreprise.Adresse_mail}</p><br>
        <p><strong>Site :</strong> <a href="${entreprise.url}" target="_blank">${entreprise.url}</a></p><br>
        <div class="description-entreprise">${desc}</div>
        <div id="starsContainer">★★★★★</div>
        <div id="groupe_bouton_offre">
          <button id="bouton_modifier" type="button">
            <img src="/public/assets/modifier.png" alt="modifier" id="image_modifier">
          </button>
          <button id="bouton_poubelle" type="button">
            <img src="/public/assets/poubelle.png" alt="poubelle" id="image_poubelle">
          </button>
        </div>
      `;

      document.getElementById("bouton_modifier").addEventListener("click", () => {
        const nouvellesValeurs = {
          id: entrepriseSelectionnee.Id_Entreprise,
          Nom: prompt("Nouveau nom :", entrepriseSelectionnee.Nom),
          Adresse: prompt("Nouvelle adresse :", entrepriseSelectionnee.Adresse),
          Adresse_mail: prompt("Nouvel email :", entrepriseSelectionnee.Adresse_mail),
          Domaine: prompt("Nouveau domaine :", entrepriseSelectionnee.Domaine),
          Specialite: prompt("Nouvelle spécialité :", entrepriseSelectionnee.Specialite),
          Region: prompt("Nouvelle région :", entrepriseSelectionnee.Region),
          Type_Entreprise: prompt("Nouveau type :", entrepriseSelectionnee.Type_Entreprise)
        };

        fetch("/app/Controllers/EntrepriseController.php?action=update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nouvellesValeurs)
        })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          location.reload();
        });
      });

      document.getElementById("bouton_poubelle").addEventListener("click", () => {
        if (confirm(`Supprimer ${entrepriseSelectionnee.Nom} ?`)) {
          fetch("/app/Controllers/EntrepriseController.php?action=delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: entrepriseSelectionnee.Id_Entreprise })
          })
          .then(res => res.text())
          .then(msg => {
            alert(msg);
            location.reload();
          });
        }
      });

      const starsContainer = document.getElementById("starsContainer");
      starsContainer.style.cursor = "pointer";

      starsContainer.addEventListener("click", e => {
        const note = Math.min(5, Math.max(1, Math.floor(e.offsetX / 20) + 1));

        fetch("/app/Controllers/EntrepriseController.php?action=rate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: entrepriseSelectionnee.Id_Entreprise,
            note: note
          })
        })
        .then(res => res.json())
        .then(msg => {
          alert(`Tu as mis ${note} ⭐ à ${entrepriseSelectionnee.Nom}.\n${msg}`);
        });
      });
    });

    container.appendChild(card);
  });

  pageNumber.textContent = numPage;
  prevBtn.disabled = (numPage === 1);
  nextBtn.disabled = (fin >= liste.length);
}

prevBtn.addEventListener("click", () => {
  if (pageActuelle > 1) {
    pageActuelle--;
    afficherPage(pageActuelle, entreprisesAffichees);
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(entreprisesAffichees.length / entreprisesParPage);
  if (pageActuelle < totalPages) {
    pageActuelle++;
    afficherPage(pageActuelle, entreprisesAffichees);
  }
});
