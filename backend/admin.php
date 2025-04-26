<?php
include 'config.php';
session_start();

// Check if user is admin
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // View all users
    $stmt = $conn->query("SELECT id, username, email, role FROM users");
    $users = [];
    while($row = $stmt->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);

} elseif ($method == 'POST') {
    // Update user
    $data = json_decode(file_get_contents("php://input"), true);
    $id = (int)$data['id'];
    $email = $conn->real_escape_string($data['email']);
    $role = $conn->real_escape_string($data['role']);
    
    $sql = "UPDATE users SET email='$email', role='$role' WHERE id=$id";
    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

} elseif ($method == 'DELETE') {
    // Delete user
    parse_str(file_get_contents("php://input"), $data);
    $id = (int)$data['id'];
    
    $sql = "DELETE FROM users WHERE id=$id";
    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }

} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

$conn->close();
?>
