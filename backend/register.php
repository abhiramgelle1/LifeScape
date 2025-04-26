<?php
include 'config.php';
$data = json_decode(file_get_contents("php://input"), true);

$username = $conn->real_escape_string($data['username']);
$email = $conn->real_escape_string($data['email']);
$password = password_hash($data['password'], PASSWORD_BCRYPT);
$role = $conn->real_escape_string($data['role']); // new

// Insert with role
$sql = "INSERT INTO users (username, email, password, role) VALUES ('$username', '$email', '$password', '$role')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
