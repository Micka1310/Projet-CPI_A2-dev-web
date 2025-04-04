<?php
require_once __DIR__ . '/../Models/newsletter_m.php';
require_once __DIR__ . '/../../core/Database.php';


class NewsletterController {
    private $model;

    public function __construct() {
        $this->model = new NewsletterModel();
    }

    public function handleFormSubmission($email) {
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            header("Location: /public/views/newsletter.html?error=1");
            exit();
        }

        if ($this->model->emailExists($email)) {
            header("Location: /public/views/newsletter.html?error=1");
            exit();
        }

        $this->model->saveEmail($email);
        $this->sendConfirmationEmail($email);
        header("Location: /public/views/newsletter.html?success=1");
        exit();
    }

    private function sendConfirmationEmail($email) {
        $sujet = "Merci pour votre inscription à la newsletter !";
        $message = "Bonjour,\n\nMerci de vous être inscrit à notre newsletter. Vous recevrez bientôt nos dernières actualités.";
        $headers = "From: newsletter@votre-site.com";

        mail($email, $sujet, $message, $headers);
    }
}
