/* JS de l'en-tête et gestion des étudiants pour le projet CESI */

document.addEventListener("DOMContentLoaded", function () {
    const bouton_burger_1 = document.getElementById("bouton_burger_1");
    const lien_burger_1 = document.getElementById("lien_burger_1");
    const lien_burger_2 = document.getElementById("lien_burger_2");
    const profil_1 = document.getElementById("profil_1");
    const lien_profil_1 = document.getElementById("lien_profil_1");
    const lien_profil_2 = document.getElementById("lien_profil_2");
    const bouton_x_2 = document.getElementById("x_2");
    const bouton_x_3 = document.getElementById("x_3");

    let profil_afficher = false;
    let lien_afficher = false;

    const isLandscape = () => window.matchMedia("(orientation: landscape)").matches;

    const clique_burger_1 = () => {
        if (!lien_afficher) {
            if (isLandscape() && window.innerHeight < 600 && window.innerWidth < 940) {
                lien_burger_1?.style && (lien_burger_1.style.transform = "translateX(0%)");
            } else if (isLandscape()) {
                lien_burger_2?.style && (lien_burger_2.style.display = "flex");
                lien_burger_2.style.width = "auto";
                lien_profil_1?.style && (lien_profil_1.style.display = "none");
                profil_afficher = false;
            } else {
                lien_burger_1?.style && (lien_burger_1.style.transform = "translateX(0%)");
            }
            lien_afficher = true;
        } else {
            if (isLandscape() && lien_burger_2?.style) {
                lien_burger_2.style.display = "none";
                lien_afficher = false;
            }
        }
    };

    const clique_bouton_x_2 = () => {
        lien_burger_1?.style && (lien_burger_1.style.transform = "translateX(100%)");
        lien_afficher = false;
    };

    const clique_profil = () => {
        if (!profil_afficher) {
            if (isLandscape() && window.innerHeight < 600 && window.innerWidth < 940) {
                lien_profil_2?.style && (lien_profil_2.style.transform = "translateX(0%)");
            } else if (isLandscape()) {
                lien_profil_1?.style && (lien_profil_1.style.display = "flex");
                lien_burger_2?.style && (lien_burger_2.style.display = "none");
                lien_afficher = false;
            } else {
                lien_profil_2?.style && (lien_profil_2.style.transform = "translateX(0%)");
            }
            profil_afficher = true;
        } else {
            lien_profil_1?.style && (lien_profil_1.style.display = "none");
            profil_afficher = false;
        }
    };

    const clique_bouton_x_3 = () => {
        lien_profil_2?.style && (lien_profil_2.style.transform = "translateX(100%)");
        profil_afficher = false;
    };

    const clique_page_1 = (e) => {
        if (lien_afficher && lien_burger_2 && !lien_burger_2.contains(e.target) && !bouton_burger_1.contains(e.target) && isLandscape()) {
            lien_burger_2.style.display = "none";
            lien_afficher = false;
        }
        if (profil_afficher && lien_profil_1 && !lien_profil_1.contains(e.target) && !profil_1.contains(e.target) && isLandscape()) {
            lien_profil_1.style.display = "none";
            profil_afficher = false;
        }
    };

    const changement_mode = () => {
        if (isLandscape()) {
            lien_profil_1?.style && (lien_profil_1.style.display = "none");
            lien_burger_2?.style && (lien_burger_2.style.display = "none");
            profil_afficher = false;
            lien_afficher = false;

            lien_profil_2?.style && (lien_profil_2.style.display = window.innerHeight < 600 && window.innerWidth < 940 ? "flex" : "none");
            lien_burger_1?.style && (lien_burger_1.style.display = window.innerHeight < 600 && window.innerWidth < 940 ? "flex" : "none");
        } else {
            lien_profil_1?.style && (lien_profil_1.style.display = "none");
            lien_profil_2?.style && (lien_profil_2.style.display = "flex");
            lien_burger_2?.style && (lien_burger_2.style.display = "none");
            lien_burger_1?.style && (lien_burger_1.style.display = "flex");
            profil_afficher = false;
            lien_afficher = false;
        }
    };

    bouton_burger_1?.addEventListener("click", clique_burger_1);
    bouton_x_2?.addEventListener("click", clique_bouton_x_2);
    profil_1?.addEventListener("click", clique_profil);
    bouton_x_3?.addEventListener("click", clique_bouton_x_3);
    document.addEventListener("click", clique_page_1);

    changement_mode();
    window.matchMedia("(orientation: portrait)").addEventListener("change", changement_mode);

    // Gestion responsive footer
    const toggleFooterLinks = () => {
        const footerLinks = document.querySelector('.footer-links');
        const footerLinksList = document.getElementById('footer-links-list');

        if (!footerLinks || !footerLinksList) return;

        footerLinks.style.display = window.innerWidth <= 768 ? "none" : "flex";
        footerLinksList.style.display = window.innerWidth <= 768 ? "block" : "none";
    };

    window.addEventListener('load', toggleFooterLinks);
    window.addEventListener('resize', toggleFooterLinks);

    // --- Gestion étudiants ---
    const form = document.getElementById("pilot-form");
    const studentList = document.getElementById("student-list");
    const searchForm = document.querySelector(".search-bar form");

    const loadStudents = (filters = {}, clearSearch = false) => {
        let query = new URLSearchParams(filters).toString();
        fetch(`/app/Controllers/petudiant_controller.php?action=search&${query}`)
            .then(res => res.json())
            .then(data => {
                studentList.innerHTML = data.length ? "" : `<li>Aucun étudiant trouvé.</li>`;
                data.forEach(student => {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        ${student.Nom_Utilisateur} ${student.Prenom_Utilisateur} 
                        ${student.Promotion} ${student.Mineure}
                        <span class="edit-icon" style="cursor:pointer">✏️</span>
                        <span class="delete-icon" style="cursor:pointer; margin-left: 10px;">🗑️</span>
                    `;
                    li.querySelector(".edit-icon").addEventListener("click", () => populateForm(student));
                    li.querySelector(".delete-icon").addEventListener("click", () => {
                        if (confirm(`❗ Supprimer ${student.Nom_Utilisateur} ${student.Prenom_Utilisateur} ?`)) {
                            deleteStudent(student.Mail_Utilisateur);
                        }
                    });
                    studentList.appendChild(li);
                });
                if (clearSearch) searchForm.reset();
            })
            .catch(err => console.error("Erreur de chargement des étudiants :", err));
    };

    const deleteStudent = (email) => {
        fetch(`/app/Controllers/petudiant_controller.php?action=delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.status === "success" ? "✅ Étudiant supprimé avec succès !" : "❌ Erreur : " + data.message);
            if (data.status === "success") loadStudents();
        })
        .catch(err => console.error("Erreur suppression :", err));
    };

    const populateForm = (student) => {
        document.getElementById("name").value = student.Nom_Utilisateur;
        document.getElementById("firstName").value = student.Prenom_Utilisateur;
        document.getElementById("email").value = student.Mail_Utilisateur ?? '';
        document.getElementById("phone").value = student.Numero_de_telephone ?? '';
        document.querySelector("select[name='promotion']").value = student.Promotion;
        document.querySelector("select[name='mineure']").value = student.Mineure;
        alert("Modifiez les champs puis cliquez sur Ajouter pour mettre à jour.");
    };

    form?.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        fetch("/app/Controllers/petudiant_controller.php?action=add", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            alert(data.status === "success" ? "✅ Étudiant ajouté ou modifié avec succès !" : "❌ Erreur : " + data.message);
            if (data.status === "success") {
                form.reset();
                loadStudents();
            }
        })
        .catch(err => console.error("Erreur lors de l'ajout :", err));
    });

    searchForm?.addEventListener("submit", function (e) {
        e.preventDefault();
        const nom = searchForm.querySelector("input[name='nom_etudiant']").value;
        const promotion = searchForm.querySelector("select[name='promotion']").value;
        const mineure = searchForm.querySelector("select[name='mineure']").value;
        loadStudents({ nom_etudiant: nom, promotion, mineure });
    });

    document.getElementById("reset-search")?.addEventListener("click", () => {
        searchForm.reset();
        loadStudents();
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
    } else {
        console.warn("Certains éléments du module upload sont manquants.");
    }

    loadStudents();
});


/* TEST CONNEXION
if (!data.connected || !["admin", "pilote"].includes(data.user.Permission)) {
    localStorage.setItem("accessDenied", "⛔ Vous n'avez pas accès à cette page.");
    const previous = localStorage.getItem("previousPage") || "/index.html";
    window.location.href = previous;
}

*/