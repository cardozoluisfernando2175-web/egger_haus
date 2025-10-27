<?php
session_start();
require_once 'config.php';

// Asegurar que la respuesta sea JSON
header('Content-Type: application/json; charset=utf-8');

// Solo aceptar peticiones POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del formulario
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// Validación básica
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Por favor, completa todos los campos']);
    exit;
}

// Sanitizar correo
$email = filter_var(trim($email), FILTER_SANITIZE_EMAIL);
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Correo electrónico inválido']);
    exit;
}

try {
    // Buscar usuario en la base de datos
    $stmt = $pdo->prepare("SELECT id, email, password FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Verificar credenciales
    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['email'] = $user['email'];
        echo json_encode(['success' => true, 'redirect' => 'catalogo.php']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
    }
} catch (Exception $e) {
    // En producción, no muestres el error real
    error_log("Login error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
}
?>
