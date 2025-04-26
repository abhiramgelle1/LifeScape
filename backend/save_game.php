<?php
include 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    die('Unauthorized');
}

$data = json_decode(file_get_contents("php://input"), true);
$generations = (int)$data['generations'];
$user_id = $_SESSION['user_id'];

$sql = "INSERT INTO game_sessions (user_id, generations) VALUES ('$user_id', '$generations')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}

$conn->close();
?>
