<?php
include 'config.php';
session_start();
$data = json_decode(file_get_contents("php://input"), true);

$username = $conn->real_escape_string($data['username']);
$password = $data['password'];

$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result && $user = $result->fetch_assoc()) {
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        echo json_encode(["success" => true, "role" => $user['role']]);
    } else {
        echo json_encode(["success" => false]);
    }
} else {
    echo json_encode(["success" => false]);
}

$conn->close();
?>
