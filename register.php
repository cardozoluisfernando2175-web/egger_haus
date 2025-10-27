<?php
session_start();
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'] ?? '';

    if (!$email || strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'El correo ya está registrado']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO usuarios (email, password) VALUES (?, ?)");
    $stmt->execute([$email, $hashedPassword]);

    echo json_encode(['success' => true, 'message' => 'Usuario creado. Ahora inicia sesión.']);
    exit;
}
?>
