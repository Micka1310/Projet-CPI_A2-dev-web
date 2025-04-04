document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('add-company-form');
    const boutonRechercher = document.getElementById("btn-rechercher");
    const aucunResultat = document.getElementById("aucun-resultat");
    const tbody = document.querySelector("#enterprise-stats tbody");

    // Ajouter une ligne manuellement dans le tableau
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const companyName = document.getElementById('company-name').value;
            const year = document.getElementById('year').value;
            const interns = document.getElementById('interns-count').value;
            const apprentices = document.getElementById('apprentices-count').value;
            const rating = document.getElementById('company-rating').value;

            const newRow = `<tr>
                <td>${tbody.children.length + 1}</td>
                <td>${companyName}</td>
                <td>${year}</td>
                <td>${interns}</td>
                <td>${apprentices}</td>
                <td>${rating}</td>
            </tr>`;

            tbody.innerHTML += newRow;
            form.reset();
        });
    }

    // Requête AJAX avec les filtres (MVC)
    if (boutonRechercher) {
        boutonRechercher.addEventListener("click", function () {
            const domaine = document.getElementById("filtre-domaine").value;
            const niveau = document.getElementById("filtre-niveau").value;
            const duree = document.getElementById("filtre-duree").value;
            const rang = document.getElementById("filtre-rang").value;
            const nom = document.getElementById("filtre-nom")?.value || "";

            const params = new URLSearchParams({
                domaine,
                niveau,
                duree,
                rang,
                nom
            });

            fetch(`/app/Controllers/statistiques_controller.php?${params.toString()}`)
                .then(response => response.json())
                .then(data => {
                    tbody.innerHTML = ""; // Réinitialiser le tableau

                    if (data.success && data.data.length > 0) {
                        // ✅ Des résultats sont trouvés
                        data.data.forEach((entreprise, index) => {
                            const row = `<tr>
                                <td>${index + 1}</td>
                                <td>${entreprise.nom}</td>
                                <td>${entreprise.niveau}</td>
                                <td>${entreprise.duree}</td>
                                <td>${entreprise.domaine}</td>
                                <td>${entreprise.rang}</td>
                            </tr>`;
                            tbody.innerHTML += row;
                        });
                        if (aucunResultat) aucunResultat.style.display = "none";
                    } else {
                        // ❌ Aucun résultat trouvé
                        if (aucunResultat) aucunResultat.style.display = "block";
                    }
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des données:", error);
                    if (aucunResultat) aucunResultat.style.display = "block";
                });
        });
    }
});
