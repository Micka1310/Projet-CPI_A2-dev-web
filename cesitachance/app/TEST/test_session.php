<?php
session_start();

if (isset($_GET['set'])) {
    $_SESSION['connected'] = true;
    echo json_encode(['status' => 'session set']);
    exit;
}

if (isset($_GET['check'])) {
    if (!empty($_SESSION['connected'])) {
        echo json_encode(['connected' => true]);
    } else {
        echo json_encode(['connected' => false]);
    }
    exit;
}

if (isset($_GET['clear'])) {
    session_unset();
    session_destroy();
    echo json_encode(['status' => 'session cleared']);
    exit;
}

echo json_encode(['message' => 'no action']);
