<?php
$host = "localhost";
$user = "agelle1";      
$pass = "agelle1";      
$dbname = "agelle1";    

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
