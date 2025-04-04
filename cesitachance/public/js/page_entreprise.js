document.addEventListener("DOMContentLoaded", () => {
    let entreprises = [];
    let pageActuelle = 1;
    const entreprisesParPage = 6;
  
    const container = document.querySelector("#offresContainer");
    const detailSection = document.querySelector(".company-details");
    const prevPageBtn = document.getElementById("prevBtn");
    const nextPageBtn = document.getElementById("nextBtn");
    const pageAffichee = document.getElementById("pageNumber");
  
    fetch("/app/Controllers/EntrepriseController.php?action=getAll")
      .then((response) => response.json())
      .then((data) => {
        entreprises = data;
        afficherEntreprises();
      })
      .catch((error) => console.error("Erreur lors de la récupération des entreprises:", error));
  
    function afficherEntreprises() {
      container.innerHTML = "";
  
      const debut = (pageActuelle - 1) * entreprisesParPage;
      const fin = debut + entreprisesParPage;
      const entreprisesPage = entreprises.slice(debut, fin);
  
      entreprisesPage.forEach((entreprise) => {
        const card = document.createElement("div");
        card.className = "company-card";
        card.innerHTML = `
          <img src="${entreprise.logo}" alt="Logo ${entreprise.Nom}">
          <h3>${entreprise.Nom}</h3>
          <p>${entreprise.Adresse} | ${entreprise.Domaine}</p>
          <a href="${entreprise.url}" target="_blank">Visiter le site</a>
        `;
        card.addEventListener("click", () => {
          const descriptionAvecSauts = entreprise.Description
            ? entreprise.Description.replace(/\\n/g, "<br>").replace(/\n/g, "<br>")
            : "";
          detailSection.innerHTML = `
            <h2>${entreprise.Nom}</h2><br>
            <p><strong>Ville :</strong> ${entreprise.Adresse}</p><br>
            <p><strong>Spécialité :</strong> ${entreprise.Domaine}</p><br>
            <p><strong>Numéro de téléphone :</strong> ${entreprise.Numero_Telephone || "Non renseigné"}</p><br>
            <p><strong>Site :</strong> <a href="${entreprise.url}" target="_blank">${entreprise.url}</a></p><br>
            <div class="description-entreprise">${descriptionAvecSauts}</div>
          `;
          detailSection.style.display = "block";
          document.querySelector(".company-list").classList.remove("full-width");
        });
        container.appendChild(card);
      });
  
      const totalPages = Math.ceil(entreprises.length / entreprisesParPage);
      pageAffichee.textContent = pageActuelle;
      
      if (nextPageBtn && prevPageBtn) {
        nextPageBtn.disabled = pageActuelle === totalPages;
        prevPageBtn.disabled = pageActuelle === 1;
      }
      
    }
  
    prevPageBtn.addEventListener("click", () => {
      if (pageActuelle > 1) {
        pageActuelle--;
        afficherEntreprises();
      }
    });
  
    nextPageBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(entreprises.length / entreprisesParPage);
      if (pageActuelle < totalPages) {
        pageActuelle++;
        afficherEntreprises();
      }
    });
  });
  