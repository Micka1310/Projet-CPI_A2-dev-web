-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 04 avr. 2025 à 07:59
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cesitachance_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `ajoute_wishlist`
--

DROP TABLE IF EXISTS `ajoute_wishlist`;
CREATE TABLE IF NOT EXISTS `ajoute_wishlist` (
  `Mail_Utilisateur` varchar(50) NOT NULL,
  `Id_Offre` int NOT NULL,
  `Id_Utilisateur` int DEFAULT NULL,
  PRIMARY KEY (`Mail_Utilisateur`,`Id_Offre`),
  KEY `Id_Offre` (`Id_Offre`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

DROP TABLE IF EXISTS `entreprise`;
CREATE TABLE IF NOT EXISTS `entreprise` (
  `Id_Entreprise` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  `Adresse` varchar(60) DEFAULT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Adresse_mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Domaine` varchar(50) DEFAULT NULL,
  `logo` varchar(255) NOT NULL,
  `Specialite` varchar(50) DEFAULT NULL,
  `Region` varchar(50) DEFAULT NULL,
  `Type_Entreprise` varchar(50) DEFAULT NULL,
  `Date_Publication` date DEFAULT NULL,
  `Nb_Stagiaires_Postules` int DEFAULT NULL,
  `Note` float DEFAULT '0',
  PRIMARY KEY (`Id_Entreprise`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`Id_Entreprise`, `Nom`, `Adresse`, `Description`, `Adresse_mail`, `url`, `Domaine`, `logo`, `Specialite`, `Region`, `Type_Entreprise`, `Date_Publication`, `Nb_Stagiaires_Postules`, `Note`) VALUES
(1, 'Vinci', '1 rue de la République, Paris', 'Vinci, anciennement Société générale d\'entreprises (SGE), est la deuxième entreprise mondiale des métiers des concessions et de la construction, employant 280 000 salariés à travers le monde.\n\nL\'activité de Vinci s\'organise autour de trois branches de métiers : concessions, énergie et construction. En 2021, l\'entreprise est présente dans plus de cent pays[9] et son chiffre d\'affaires est de 49,396 milliards d\'euros', 'contact@vinci-construction.com', 'https://jobs.vinci.com/fr/recherche-d%27offres?acm=32060736,32057664&alrpm=3017382&ascf=[%7B%22key%22:%22salary_time%22,%22value%22:%22VINCI+Construction%22%7D]&gad_source=1&gclid=CjwKCAjw-qi_BhBxEiwAkxvbkN1lhxBj2y4aaQ_CRFfF8xyIE9iCngIaj4qDWp6HQAMO9r0soNCMqhoCkiEQAvD_BwE&ss=paid&utm_source=campagne-', 'VINCI est le n° 1 mondial des prestations de const', '/public/assets/entreprise/Vinci.png', 'BTP', 'Ile-de-France', 'privé', '2025-02-26', 15, 0),
(2, 'Thales', ' 4 RUE DE LA VERRERIE 92190 MEUDON.', 'Thales est un leader mondial des hautes technologies qui compte 83 000 collaborateurs dans le monde. Thales investit dans les innovations du numérique et de la « Deep Tech » (connectivité, Big data, intelligence artificielle, cybersécurité et quantique) pour construire un avenir de confiance.\n\nOpérant sur les marchés de la défense, de l’aérospatial, de la cyber et digital, le Groupe propose des solutions, services et produits qui aident ses clients - entreprises, organisations, Etats - à remplir leurs missions critiques. ', ' cpl.emea-sdr@thalesgroup.com', 'https://careers.thalesgroup.com/fr/fr/search-results', 'Nous servons cinq grands secteurs essentiels pour ', '/public/assets/entreprise/Thales.png', 'Informatique', 'Ile-de-France', 'public', '2024-06-30', 12, 0),
(3, 'Google', '8 Rue de Londres, 75009 Paris', 'Google LLC est une société américaine spécialisée dans les produits liés à Internet et les appareils à technologie électronique et les logiciels dont ils ont besoin. Son produit vedette est le moteur de recherche le plus connu de tous: Google .', 'cloud-partner-support@google.com\n', 'https://www.google.com/about/careers/applications/?hl=fr-ca', 'marché d\'Internet et des services technologiques.', '/public/assets/entreprise/Google.png', 'Informatique', 'Ile-de-France', 'privé', '2024-11-15', 18, 0),
(4, 'Microsoft', '39 Quai du Président Roosevelt, 92130 Issy-les-Moulineaux', 'Microsoft Corporation est une société technologique multinationale américaine qui développe, fabrique, concède des licences, assure le support et vend des logiciels informatiques, des produits électroniques grand public, des ordinateurs personnels et des services.', 'infofr@microsoft.com', 'https://careers.microsoft.com/v2/ca/fr/accueil.html', 'conception, du développement et de la commercialis', '/public/assets/entreprise/Microsoft.png', 'Informatique', 'Ile-de-France', 'privé', '2025-03-29', 25, 0),
(5, 'Capgemini', '11 Rue de Tilsitt, 75017 Paris', 'Capgemini est une entreprise de services du numérique (ESN) française créée par Serge Kampf en 1967 à Grenoble, sous le nom de Sogeti. Il s\'agit de l\'ESN qui a le plus gros chiffre d\'affaires du pays et elle figure parmi les dix plus grosses du secteur mondialement.', 'institut.fr@capgemini.com ', 'https://www.capgemini.com/fr-fr/carrieres/rejoignez-nous/nos-offres-demploi/?country_code=fr-fr&country_name=France&size=15', 'eilleures expertises dans les domaines de la strat', '/public/assets/entreprise/Capgemini.png', 'Informatique', 'Ile-de-France', 'privé', '2025-01-10', 32, 0),
(6, 'Dassault système', '10 Rue Marcel Dassault, 78140 Vélizy-Villacoublay', 'Dassault Systèmes contribue à améliorer la vie réelle grâce aux mondes virtuels.\n\nNos solutions, fondées sur la science, nous aident à concevoir des jumeaux virtuels d’expérience pour tous - y compris vous ! Nous sommes fiers d\'être une entreprise durable qui contribue à l\'innovation responsable de nos clients et de la société dans son ensemble.', 'contact@3ds.com', 'https://www.3ds.com/fr/careers/jobs', 'onçoit et fabrique des avions militaires, des avio', '/public/assets/entreprise/Dassault système.png', NULL, NULL, NULL, NULL, NULL, 3),
(7, 'Orange', '78 rue Olivier de Serres, 75015 Paris', 'Nous sommes l\'un des principaux opérateurs de télécommunications et de services numériques dans le monde. Nous servons 291 millions de clients, particuliers, professionnels et grandes entreprises au 31 décembre 2024 : nous sommes notamment l’un des leaders mondiaux des services de télécommunication pour les entreprises multinationales, sous la marque Orange Business.', 'contact.orange@orange.com\n', 'https://orange.jobs/site/fr-home/', 'Commercialisation d\'équipements et de services de ', '/public/assets/entreprise/Orange.png', 'S3E', 'Ile-de-France', 'public', '2024-12-12', 12, 0),
(8, 'Ubisoft', '28 rue Armand Carrel, 93100 Montreuil', 'L\'histoire d\'Ubisoft commence par une famille : les cinq frères Guillemot. Ils ont vu une opportunité dans le secteur en pleine expansion du développement de logiciels et ont fondé Ubisoft en 1986 pour créer et distribuer des jeux vidéo dans le monde entier.', 'hr_bg@ubisoft.com', 'https://www.ubisoft.com/fr-fr/company/careers/search', 'édition de jeux électroniques.', '/public/assets/entreprise/Ubisoft.png', 'Informatique', 'Ile-de-France', 'privé', '2024-08-25', 7, 0),
(9, 'Airbus', '1 Rond-Point Maurice Bellonte, 31707 Blagnac', 'Airbus est le plus grand groupe aéronautique et spatial européen. Il fournit des produits, des services et des solutions pour les secteurs de l\'aviation commerciale, des hélicoptères, de la défense et de l\'espace. Forts de plus d\'un demi-siècle d\'expertise en ingénierie aérospatiale, les produits Airbus se distinguent par leur innovation. Nous développons la prochaine génération d\'avions plus légers, plus sûrs et plus économes en carburant, capables de voler avec des carburants alternatifs.\n\nDes avions commerciaux et des hélicoptères qui connectent et unissent les peuples du monde entier aux avions militaires et aux satellites qui protègent les citoyens et les pays, les produits Airbus permettent une vie moderne et connectée.', 'asset.management@airbus.com', 'https://www.protect.airbus.com/fr/carriere/offres-emploi/', 'Airbus Atlantic est un leader industriel mondial e', '/public/assets/entreprise/Airbus.png', 'Généraliste', 'Occitanie', 'mixte', '2024-10-13', 18, 0),
(10, 'L\'Oréal', '41 rue Martre, 92117 Clichy', 'L’Oréal est un groupe industriel français de produits cosmétiques. La société, créée par Eugène Schueller le 30 juillet 1909, est de nos jours devenue le groupe international numéro un mondial de l\'industrie cosmétique[', 'hr-dataprivacy@loreal.com', 'https://careers.loreal.com/fr_FR/content/HOME', ' le Groupe crée et développe des produits cosmétiq', '/public/assets/entreprise/L\'Oréal.png', 'Généraliste', 'Ile-de-France', 'privé', '0000-00-00', 32, 0),
(11, 'EDF', '22-30 avenue de Wagram, 75008 Paris', 'Électricité de France est une société anonyme française de production et de fourniture d\'électricité, détenue à 100 % par l\'État français. L\'entreprise est le premier producteur et le premier fournisseur d\'électricité en France et en Europe.', 'recrutement-edf-master@edf.fr.', 'https://www.edf.fr/edf-recrute/rejoignez-nous/voir-les-offres/nos-offres', 'Le groupe EDF commercialise de l\'énergie et des se', '/public/assets/entreprise/EDF.png', 'S3E', 'Ile-de-France', 'public', '2024-04-24', 18, 0),
(12, 'Safran', ' bd Gén Martial Valin à Paris (75015).', 'Safran est un groupe international de haute technologie opérant dans les domaines de l’aéronautique (propulsion, équipements et intérieurs), de l’espace et de la défense. Sa mission : contribuer durablement à un monde plus sûr, où le transport aérien devient toujours plus respectueux de l’environnement, plus confortable et plus accessible. Implanté sur tous les continents, le Groupe emploie 100 000 collaborateurs pour un chiffre d\'affaires de 27,3 milliards d\'euros en 2024', 'portail-safran@safrangroup.com', 'https://www.safran-group.com/fr/offres?gad_source=1&gclid=CjwKCAjw-qi_BhBxEiwAkxvbkEbBXr8sX1F4KzaSoPzQsV3EJ4JBMldbm4KBx6yjnY7aNVVyheBzSBoCQQcQAvD_BwE', 'l\'aéronautique (propulsion, équipements et intérie', '/public/assets/entreprise/Safran.png', 'Généraliste', 'Ile-de-France', 'mixte', '2024-09-06', 22, 0),
(13, 'BNP paribas', '1, boulevard Haussmann 75009 Paris.', 'Leader européen des services bancaires et financiers, BNP Paribas se distingue par la puissance de son modèle intégré et diversifié qui se structure autour de trois pôles opérationnels. La complémentarité des expertises lui permet de répondre aux besoins des clients, en les accompagnant et les conseillant sur le long terme, et de délivrer une performance solide et durable.', 'contact@bnpparibas.com\n', 'https://group.bnpparibas/emploi-carriere/toutes-offres-emploi', ': services bancaires pour particuliers et pour com', '/public/assets/entreprise/BNP paribas.png', 'Généraliste', 'Ile-de-France', 'privé', '2025-01-30', 19, 0),
(14, 'Engie', '16 boulevard des Italiens, 75009 Paris', 'Engie est un groupe industriel énergétique français. Son principal actionnaire est l\'État français, qui détenait un quart du capital jusqu\'en 2019. Le groupe naît le 22 juillet 2008 d\'une fusion entre Gaz de France et Suez.', 'contact@engie.com\n', 'https://www.engie.com/jobs', 'la production et la fourniture d\'électricité et de', '/public/assets/entreprise/Engie.png', 'Généraliste', 'Ile-de-France', 'mixte', '2024-11-22', 27, 0),
(15, 'LVMH', '22 Avenue Montaigne, 75008 Paris', 'Premier groupe mondial de l\'industrie du luxe, LVMH (Louis Vuitton-Moët-Hennessy) puise une part de ses origines dans l\'histoire du maroquinier Louis Vuitton, layetier emballeur qui, en 1854, crée la maison qui porte son nom afin de commercialiser des malles de voyage révolutionnaires pour l\'époque.', 'press@lvmh.com', 'https://www.lvmh.com/fr/nous-rejoindre/nos-offres', 'les vins et spiritueux ; la mode et la maroquineri', '/public/assets/entreprise/LVMH.png', 'Généraliste', 'Ile-de-France', 'privé', '2024-04-14', 16, 0);

-- --------------------------------------------------------

--
-- Structure de la table `evaluer`
--

DROP TABLE IF EXISTS `evaluer`;
CREATE TABLE IF NOT EXISTS `evaluer` (
  `Mail_Utilisateur` varchar(50) NOT NULL,
  `Id_Entreprise` int NOT NULL,
  `note` tinyint NOT NULL,
  PRIMARY KEY (`Mail_Utilisateur`,`Id_Entreprise`),
  KEY `Id_Entreprise` (`Id_Entreprise`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `gerer`
--

DROP TABLE IF EXISTS `gerer`;
CREATE TABLE IF NOT EXISTS `gerer` (
  `Mail_Utilisateur` varchar(50) NOT NULL,
  `Id_Entreprise` int NOT NULL,
  PRIMARY KEY (`Mail_Utilisateur`,`Id_Entreprise`),
  KEY `Id_Entreprise` (`Id_Entreprise`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `offre`
--

DROP TABLE IF EXISTS `offre`;
CREATE TABLE IF NOT EXISTS `offre` (
  `Id_Offre` int NOT NULL AUTO_INCREMENT,
  `Titre` varchar(50) DEFAULT NULL,
  `Description_Offre` varchar(140) DEFAULT NULL,
  `Competences` varchar(60) DEFAULT NULL,
  `Remuneration` smallint DEFAULT NULL,
  `Date_Mise_En_Ligne` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Langue` varchar(50) DEFAULT NULL,
  `Date_Debut_Stage` date DEFAULT NULL,
  `Duree_Stage` char(50) DEFAULT NULL,
  `Specialité` varchar(50) DEFAULT NULL,
  `Avantages` varchar(50) DEFAULT NULL,
  `Villes` varchar(50) DEFAULT NULL,
  `Id_Entreprise` int NOT NULL,
  `logo` blob,
  `teletravail` varchar(50) DEFAULT NULL,
  `Niveau_Etude` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id_Offre`),
  KEY `Id_Entreprise` (`Id_Entreprise`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `offre`
--

INSERT INTO `offre` (`Id_Offre`, `Titre`, `Description_Offre`, `Competences`, `Remuneration`, `Date_Mise_En_Ligne`, `Langue`, `Date_Debut_Stage`, `Duree_Stage`, `Specialité`, `Avantages`, `Villes`, `Id_Entreprise`, `logo`, `teletravail`, `Niveau_Etude`) VALUES
(1, 'Première offre', 'Ne pas supprimer svp', 'Savoir utiliser un chat qui à pété', 800, '2025-04-03 16:52:51', 'francais', NULL, '4mois', 'informatique', 'aucun car tu sera notre esclave', 'Nanterre', 1, '', 'non', 'bac+2'),
(2, 'Deuxième offre', 'On a besoin d\'un serveur de café', 'savoir faire du café', 800, '2025-04-03 18:11:46', 'francais', NULL, '2mois', 'generaliste', 'Travailler chez Google suffit non ? ;)', 'peu importe', 2, 0x696e666f206d616e7175616e74652e706e67, 'oui', 'aucun'),
(3, 'Troisième offre', 'On a besoin d\'un serveur de café', 'savoir faire du café', 800, '2025-04-03 18:34:35', 'anglais', NULL, '2mois', 'generaliste', 'Travailler chez Google suffit non ? ;)', 'peu importe', 2, 0x696e666f206d616e7175616e74652e706e67, 'non', 'aucun'),
(4, 'test4', '', '', 800, '2025-04-03 20:31:10', 'francais', NULL, '2mois', 'generaliste', '', 'aaaaaaa', 1, 0x696e666f206d616e7175616e74652e706e67, 'oui', 'aucun'),
(5, 'test5', '', '', 800, '2025-04-03 20:31:29', 'espagnol', NULL, '2mois', 'generaliste', '', 'bbbbb', 2, 0x696e666f206d616e7175616e74652e706e67, 'non', 'aucun'),
(6, 'test6', '', '', 800, '2025-04-03 20:34:59', 'espagnol', NULL, '2mois', 'generaliste', '', 'ccccc', 1, 0x696e666f206d616e7175616e74652e706e67, 'non', 'aucun'),
(7, 'testimage', '', '', 800, '2025-04-03 21:36:08', 'anglais', NULL, '2mois', 'generaliste', '', 'mamamammamamaa', 1, 0x696e666f206d616e7175616e74652e706e67, 'oui', 'aucun'),
(8, 'dddddddddd', '', '', 800, '2025-04-03 22:53:18', 'francais', NULL, '2mois', 'generaliste', '', 'dddddddd', 1, 0x696e666f206d616e7175616e74652e706e67, 'oui', 'aucun');

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE IF NOT EXISTS `permissions` (
  `Id_Permission` int NOT NULL AUTO_INCREMENT,
  `Nom_Permission` varchar(100) NOT NULL,
  PRIMARY KEY (`Id_Permission`),
  UNIQUE KEY `Nom_Permission` (`Nom_Permission`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `permissions`
--

INSERT INTO `permissions` (`Id_Permission`, `Nom_Permission`) VALUES
(1, 'Authentifier'),
(2, 'Rechercher une entreprise'),
(3, 'Créer une entreprise'),
(4, 'Modifier une entreprise'),
(5, 'Évaluer une entreprise'),
(6, 'Supprimer une entreprise'),
(7, 'Consulter les stats des entreprises'),
(8, 'Rechercher une offre'),
(9, 'Créer une offre'),
(10, 'Modifier une offre'),
(11, 'Supprimer une offre'),
(12, 'Consulter les stats des offres'),
(13, 'Rechercher un compte pilote'),
(14, 'Créer un compte pilote'),
(15, 'Modifier un compte pilote'),
(16, 'Supprimer un compte pilote'),
(17, 'Rechercher un compte étudiant'),
(18, 'Créer un compte étudiant'),
(19, 'Modifier un compte étudiant'),
(20, 'Supprimer un compte étudiant'),
(21, 'Consulter les stats des étudiants'),
(22, 'Ajouter une offre à la wish-list'),
(23, 'Retirer une offre à la wish-list'),
(24, 'Postuler à une offre');

-- --------------------------------------------------------

--
-- Structure de la table `postule`
--

DROP TABLE IF EXISTS `postule`;
CREATE TABLE IF NOT EXISTS `postule` (
  `Mail_Utilisateur` varchar(50) NOT NULL,
  `Id_Offre` int NOT NULL,
  `CV` varchar(50) DEFAULT NULL,
  `Lettre_De_Motivation` varchar(50) DEFAULT NULL,
  `Date_Postulation` date NOT NULL,
  `Mail_Utilisateur_Pour_Offre` varchar(50) DEFAULT NULL,
  `Numero_Telephone_Offre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Mail_Utilisateur`,`Id_Offre`),
  KEY `Id_Offre` (`Id_Offre`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `Id_Role` int NOT NULL AUTO_INCREMENT,
  `Nom_Role` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_Role`),
  UNIQUE KEY `Nom_Role` (`Nom_Role`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`Id_Role`, `Nom_Role`) VALUES
(1, 'Administrateur'),
(2, 'Pilote'),
(3, 'etudiant');

-- --------------------------------------------------------

--
-- Structure de la table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE IF NOT EXISTS `role_permissions` (
  `Id_Role` int NOT NULL,
  `Id_Permission` int NOT NULL,
  PRIMARY KEY (`Id_Role`,`Id_Permission`),
  KEY `Id_Permission` (`Id_Permission`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `role_permissions`
--

INSERT INTO `role_permissions` (`Id_Role`, `Id_Permission`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 17),
(2, 18),
(2, 19),
(2, 20),
(2, 21),
(3, 1),
(3, 2),
(3, 5),
(3, 7),
(3, 8),
(3, 12),
(3, 22),
(3, 23),
(3, 24);

-- --------------------------------------------------------

--
-- Structure de la table `statistiques`
--

DROP TABLE IF EXISTS `statistiques`;
CREATE TABLE IF NOT EXISTS `statistiques` (
  `Id_Statistiques` int NOT NULL AUTO_INCREMENT,
  `Type_Statistique` varchar(50) DEFAULT NULL,
  `Valeur` varchar(50) DEFAULT NULL,
  `Date_Calcul` date DEFAULT NULL,
  PRIMARY KEY (`Id_Statistiques`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `Mail_Utilisateur` varchar(50) NOT NULL,
  `Mot_De_Passe` varchar(255) DEFAULT NULL,
  `Nom_Utilisateur` varchar(50) DEFAULT NULL,
  `Prenom_Utilisateur` varchar(50) DEFAULT NULL,
  `Numero_de_telephone` varchar(50) DEFAULT NULL,
  `Permission` varchar(50) DEFAULT NULL,
  `Photo_de_profil` blob,
  `Promotion` varchar(50) DEFAULT NULL,
  `Mineure` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Mail_Utilisateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`Mail_Utilisateur`, `Mot_De_Passe`, `Nom_Utilisateur`, `Prenom_Utilisateur`, `Numero_de_telephone`, `Permission`, `Photo_de_profil`, `Promotion`, `Mineure`) VALUES
('exemple@mail.com', '$2y$10$pSfYIhp50QPWPO1mbw.FzuPm9SSEAb0SyAcuU5G58IFbJ9ho2UJpa', 'CESI', 'Badis', '0603004323', 'etudiant', NULL, 'CPI A3', 'Généraliste'),
('bna@mail.com', '$2y$10$5aJ2tRVljRTDDd7.i.koX.Fk88PyaKPHduDVIg2WGvZRKBFRas4KC', 'NNANGA NDI', 'Bibiane Mireille', '0603004323', 'pilote', NULL, 'CPI A2', NULL),
('etudiant@example.com', 'hashed_password', 'Etudiant', 'Junior', NULL, 'etudiant', NULL, NULL, NULL),
('admin@mail.com', '$2y$10$wLcWGN/8nPC/WFnxGmIjmOhwJugHqf0ZVvXSXzwA6.GdeDwpXn6ba', 'ADMIN', 'Admin', '55512364', 'admin', NULL, '', ''),
('mactapa@gmail.com', '$2y$10$BOHPHNBbm3c1C0ttcdqHGeVVdXLkpw3wYHfjKWdmGJH', 'MOUTTAPPA', 'Thomas', '0684405750', 'etudiant', NULL, 'CPI A2', 'S3E'),
('badis@gmail.com', '$2y$10$hS0VqMi1UBJnJS.EGJHGwOY.6jFZBkbb5SPk3TGArbl', 'BADUS', 'Mickaël', '0603004323', 'etudiant', NULL, 'CPI A2', 'Informatique'),
('test@mail.com', '$2y$10$WW3OuIj1HYfqdafmmrg2HuEAJCw1OIwWWCP5vvTLMMcEwLw.YCQ8a', 'HERNANDEZ', 'Mermoud', '0603004323', 'etudiant', NULL, 'CPI A2', 'Généraliste'),
('pilote@example.com', 'hashed_password', 'Pilote', 'Stage', NULL, 'Pilote', NULL, NULL, NULL),
('admin@example.com', 'hashed_password', 'Admin', 'Super', NULL, 'Administrateur', NULL, NULL, NULL),
('badis@test.com', '$2y$10$aMr39TRxZ0l8XFQIHK7eXe55Lw24Pj0TcAbRgGAITvxy/gxI4kivO', 'JILANI', 'Badis', '0603004323', 'admin', NULL, '', ''),
('eagegaeg@gmail.com', '$2y$10$gvzVrpdaEjLauw6yZgnBKubkgF5QDGboPZexIBok/qKN7dAtSdM3S', 'TESSI', 'Monf', '52462159', 'etudiant', NULL, 'CPI A1', 'S3E'),
('dafzaf@gmail.copm', '$2y$10$xW2ooXHL3u/oBtgDie0tzOZd48tElZ6Npy355ls1fuYYCkC86pYiO', 'JILANI', 'Badis', '0603004323', 'etudiant', NULL, '', ''),
('badis.jilani@gmail.com', '$2y$10$5XLv9E.r9E4yBiWpx0ve2.qjEdr9I7iQ.9HHQ0mV9r8lu2vmdUhnu', 'JILANI', 'Badis', '0603004323', 'pilote', NULL, 'CPI A2', 'Généraliste');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
