<?php
session_start();

// Si no hay sesión activa, redirigir al inicio
if (!isset($_SESSION['user_id'])) {
    header("Location: index.html");
    exit();
}
?>
