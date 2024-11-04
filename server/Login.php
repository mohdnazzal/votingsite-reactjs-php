<?php
// Database configuration
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = getenv('DB_SERVER') ?: '127.0.0.1';
$username = getenv('DB_USERNAME') ?: 'mknazzal_votingsite';
$password = getenv('DB_PASSWORD') ?: 'O06oF6v$B{ig';
$dbname = getenv('DB_NAME') ?: 'mknazzal_voting_github';

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed."]));
}

// Get the JSON input
$input = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($input['email']) || !isset($input['password'])) {
    echo json_encode(["success" => false, "message" => "Email and password are required."]);
    exit;
}

$user_input = $conn->real_escape_string($input['email']);
$password = $input['password'];

// Prepare the SQL statement
$loginQuery = $conn->prepare("SELECT id, username, email, pw_salt, pw_hash FROM users WHERE email = ? OR username = ?");
$loginQuery->bind_param('ss', $user_input, $user_input);

// Execute the query
$loginQuery->execute();

// Bind the result variables
$loginQuery->bind_result($id, $username, $email, $pw_salt, $pw_hash);

// Fetch the result
if ($loginQuery->fetch()) {
    // User was found, now verify the password
    if (password_verify($password . $pw_salt, $pw_hash)) {
        // Password is correct, login successful
        echo json_encode([
            "success" => true,
            "message" => "Login successful.",
            "id" => $id,
            "username" => $username
        ]);
    } else {
        // Incorrect password
        echo json_encode(["success" => false, "message" => "Invalid email/username or password."]);
    }
} else {
    // No matching user found
    echo json_encode(["success" => false, "message" => "Invalid email/username or password."]);
}

// Close the statement and connection
$loginQuery->close();
$conn->close();
?>
