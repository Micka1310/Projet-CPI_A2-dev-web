<?php
require_once __DIR__ . '/../app/Controllers/newsletter_controller.php';


if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['email'])) {
    $controller = new NewsletterController();
    $controller->handleFormSubmission($_POST['email']);
}
