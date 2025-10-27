<?php
// config.php
$host = 'sql111.infinityfree.com';
$dbname = 'if0_40261677_adrianacami';
$username = 'si0_40261677';      
$password = 'rafofercho123';      

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Conexión fallida: " . $e->getMessage());
}
?>

