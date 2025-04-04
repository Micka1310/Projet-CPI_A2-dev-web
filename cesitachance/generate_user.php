<?php
require_once __DIR__ . '/core/Database.php';

$isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $pdo = Database::getInstance()->getConnection();

    $email = trim($_POST['email']);
    $password = password_hash(trim($_POST['password']), PASSWORD_DEFAULT);
    $nom = strtoupper(trim($_POST['nom']));
    $prenom = trim($_POST['prenom']);
    $phone = trim($_POST['telephone']);
    $promotion = trim($_POST['promotion']);
    $mineure = trim($_POST['mineure']);
    $permission = trim($_POST['permission']);

    $stmt = $pdo->prepare("INSERT INTO utilisateur (
        Mail_Utilisateur, Mot_De_Passe, Nom_Utilisateur, Prenom_Utilisateur,
        Numero_de_telephone, Permission, Promotion, Mineure
    ) VALUES (
        :email, :password, :nom, :prenom,
        :telephone, :permission, :promotion, :mineure
    )");

    try {
        $stmt->execute([
            'email' => $email,
            'password' => $password,
            'nom' => $nom,
            'prenom' => $prenom,
            'telephone' => $phone,
            'permission' => $permission,
            'promotion' => $promotion,
            'mineure' => $mineure
        ]);

        if ($isAjax) {
            echo "✅ Utilisateur créé avec succès !";
            exit;
        }

    } catch (PDOException $e) {
        if ($isAjax) {
            echo "❌ Erreur : " . $e->getMessage();
            exit;
        }
    }
}
?>



<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Création d'utilisateur - CESI Ta Chance</title>
    <link href="https://fonts.googleapis.com/css2?family=Gelasio:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Gelasio', serif;
        }

        body {
            background: linear-gradient(to right, #6a11cb, #2575fc);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
        }

        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        h2 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 28px;
            color: #fff;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        input, select, button {
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            outline: none;
        }

        input, select {
            background: rgba(255, 255, 255, 0.9);
            color: #333;
        }

        button {
            background: #ffca28;
            color: #000;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        button:hover {
            background: #ffb300;
        }

        .message {
            margin-top: 20px;
            text-align: center;
            font-weight: bold;
        }

        .success {
            color: #00e676;
        }

        .error {
            color: #ff5252;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Créer un nouvel utilisateur</h2>
        <form id="userForm">
            <input type="email" name="email" placeholder="Email" required>
            <input type="text" name="nom" placeholder="Nom" required>
            <input type="text" name="prenom" placeholder="Prénom" required>
            <input type="password" name="password" placeholder="Mot de passe" required>
            <input type="text" name="telephone" placeholder="Téléphone" required>
            <input type="text" name="promotion" placeholder="Promotion">
            <input type="text" name="mineure" placeholder="Mineure">
            <select name="permission" required>
                <option value="">-- Choisir un rôle --</option>
                <option value="etudiant">Etudiant</option>
                <option value="pilote">Pilote</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Créer l'utilisateur</button>
        </form>
        <div class="message" id="messageBox"></div>
    </div>

    <script>
        const form = document.getElementById("userForm");
        const messageBox = document.getElementById("messageBox");

        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const formData = new FormData(form);

            fetch("generate_user.php", {
                method: "POST",
                body: formData,
                headers: {
                "X-Requested-With": "XMLHttpRequest" // ← permet à PHP de savoir que c'est une requête AJAX
                }
            })
            
            .then(response => response.text())
            .then(result => {
                if (result.includes("succès")) {
                    messageBox.className = "message success";
                } else {
                    messageBox.className = "message error";
                }
                messageBox.innerHTML = result;
                form.reset();
            })
            .catch(error => {
                messageBox.className = "message error";
                messageBox.innerText = "Une erreur est survenue.";
            });
        });
    </script>
</body>
</html>