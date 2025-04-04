// Charger les données au démarrage
document.addEventListener("DOMContentLoaded", () => {
    chargerWishlistSimple();   // tu peux alterner avec chargerWishlistDetails() selon le besoin
});

// Affiche les offres (version simple)
function chargerWishlistSimple() {
    fetch("/app/Controllers/WishlistController.php?action=get")
        .then((response) => response.json())
        .then((result) => {
            const container = document.querySelector(".wishlist");
            if (!container) return;

            container.innerHTML = ""; // nettoie

            if (result.success && Array.isArray(result.data)) {
                if (result.data.length === 0) {
                    container.innerHTML = "<p>🎒 Aucune offre dans la wishlist pour le moment.</p>";
                    return;
                }

                result.data.forEach((offre) => {
                    const div = document.createElement("div");
                    div.className = "stage";
                    div.innerHTML = `
                        <h3>Stage ID ${offre.Id_Offre}</h3>
                        <p>Ajouté le : ${offre.Date_Ajout}</p>
                        <button class="delete" data-id="${offre.Id_Offre}">Supprimer</button>
                    `;
                    container.appendChild(div);
                });
            } else {
                console.error("Erreur serveur ou données mal formées :", result.message || result);
            }
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération :", error);
        });
}

// Affiche les offres (version détaillée simulée)
function chargerWishlistDetails() {
    fetch("/app/Controllers/WishlistController.php?action=readDetails")
        .then((response) => response.json())
        .then((data) => {
            const section = document.querySelector(".wishlist");
            if (!section) return;

            section.innerHTML = "";

            if (!Array.isArray(data) || data.length === 0) {
                section.innerHTML = "<p>Aucune offre dans la wishlist.</p>";
                return;
            }

            data.forEach((offre) => {
                const div = document.createElement("div");
                div.className = "stage";
                div.innerHTML = `
                    <h3>${offre.titre}</h3>
                    <p>• Date : ${offre.date}</p>
                    <p>• Favoris : ${offre.favoris}</p>
                    <p>• Réponse : ${offre.reponse}</p>
                    <button class="delete" data-id="${offre.id}">Supprimer</button>
                `;
                section.appendChild(div);
            });
        })
        .catch((error) => {
            console.error("Erreur lors du chargement de la wishlist :", error);
        });
}

// Gestion de la suppression (event delegation)
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        const idOffre = e.target.getAttribute("data-id");
        if (!idOffre) return;

        fetch("/app/Controllers/WishlistController.php?action=delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_offre: idOffre })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("🗑️ Offre supprimée !");
                    e.target.closest(".stage").remove();
                } else {
                    alert("⚠️ " + data.message);
                }
            })
            .catch(error => {
                console.error("Erreur :", error);
                alert("❌ Une erreur est survenue.");
            });
    }
});
