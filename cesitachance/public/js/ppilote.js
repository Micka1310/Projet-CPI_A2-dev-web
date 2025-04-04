// --- Gestion pilotes uniquement ---
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pilot-form");
    const studentList = document.getElementById("student-list");
    const searchForm = document.querySelector(".search-bar form");

    const showNotification = (message, type = "success") => {
        const notif = document.getElementById("success-notification");
        notif.textContent = message;
        notif.className = `notification ${type}`;
        notif.style.display = "block";
        setTimeout(() => notif.style.display = "none", 4000);
    };

    const loadPilotes = (filters = {}, clearSearch = false) => {
        const query = new URLSearchParams(filters).toString();
        fetch(`/app/Controllers/ppilote_controller.php?action=search&${query}`)
            .then(res => res.json())
            .then(data => {
                console.log("🔍 Données reçues :", data);
                studentList.innerHTML = "";
                if (!Array.isArray(data) || data.length === 0) {
                    studentList.innerHTML = `<li>Aucun pilote trouvé.</li>`;
                    return;
                }
                data.forEach(pilot => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        ${pilot.Nom_Utilisateur} ${pilot.Prenom_Utilisateur} 
                        ${pilot.Promotion || ""} ${pilot.Mineure || ""}
                        <span class="edit-icon" style="cursor:pointer">✏️</span>
                        <span class="delete-icon" style="cursor:pointer; margin-left: 10px;">🗑️</span>
                    `;
                    li.querySelector(".edit-icon").addEventListener("click", () => populateForm(pilot));
                    li.querySelector(".delete-icon").addEventListener("click", () => {
                        if (confirm(`❗ Supprimer ${pilot.Nom_Utilisateur} ${pilot.Prenom_Utilisateur} ?`)) {
                            deletePilote(pilot.Mail_Utilisateur);
                        }
                    });
                    studentList.appendChild(li);
                });
                if (clearSearch) searchForm.reset();
            })
            .catch(err => {
                console.error("Erreur de chargement des pilotes :", err);
                showNotification("Erreur lors du chargement.", "error");
            });
    };

    const deletePilote = (email) => {
        fetch(`/app/Controllers/ppilote_controller.php?action=delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })
        .then(res => res.json())
        .then(data => {
            showNotification(data.message, data.status === "success" ? "success" : "error");
            if (data.status === "success") loadPilotes();
        })
        .catch(err => {
            console.error("Erreur suppression :", err);
            showNotification("Erreur technique lors de la suppression.", "error");
        });
    };

    const populateForm = (pilot) => {
        document.getElementById("name").value = pilot.Nom_Utilisateur;
        document.getElementById("firstName").value = pilot.Prenom_Utilisateur;
        document.getElementById("email").value = pilot.Mail_Utilisateur ?? '';
        document.getElementById("phone").value = pilot.Numero_de_telephone ?? '';
        document.querySelector("select[name='promotion']").value = pilot.Promotion;
        document.querySelector("select[name='mineure']").value = pilot.Mineure;
        showNotification("✏️ Modifiez les champs et cliquez sur Ajouter pour mettre à jour.", "success");
    };

    form?.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch("/app/Controllers/ppilote_controller.php?action=add", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            showNotification(data.message, data.status === "success" ? "success" : "error");
            if (data.status === "success") {
                form.reset();
                loadPilotes();
            }
        })
        .catch(err => {
            console.error("Erreur lors de l'ajout :", err);
            showNotification("Erreur technique lors de l'ajout.", "error");
        });
    });

    searchForm?.addEventListener("submit", function (e) {
        e.preventDefault();
        const nom = searchForm.querySelector("input[name='nom_etudiant']").value;
        const promotion = searchForm.querySelector("select[name='promotion']").value;
        const mineure = searchForm.querySelector("select[name='mineure']").value;
        loadPilotes({ nom_etudiant: nom, promotion, mineure });
    });

    document.getElementById("reset-search")?.addEventListener("click", () => {
        searchForm.reset();
        loadPilotes();
    });

    // Upload preview photo
    const uploadBox = document.getElementById("upload-box");
    const fileInput = document.getElementById("photo-upload");
    const previewImage = document.getElementById("preview-image");
    const uploadLabel = document.getElementById("upload-label");

    if (uploadBox && fileInput && previewImage && uploadLabel) {
        uploadBox.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", e => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = ev => {
                    previewImage.src = ev.target.result;
                    previewImage.style.display = "block";
                    uploadLabel.style.display = "none";
                };
                reader.readAsDataURL(file);
            }
        });
    }

    loadPilotes();
});
