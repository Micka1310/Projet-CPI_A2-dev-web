<?php
class NewsletterModel {
    private $file;

    public function __construct($filePath = "newsletter_emails.txt") {
        $this->file = $filePath;
    }

    public function emailExists($email) {
        if (!file_exists($this->file)) return false;

        $lines = file($this->file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        return in_array($email, $lines);
    }

    public function saveEmail($email) {
        file_put_contents($this->file, $email . PHP_EOL, FILE_APPEND | LOCK_EX);
    }
}
