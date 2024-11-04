<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Load credentials securely from environment variables
$servername = getenv('DB_SERVER') ?: '127.0.0.1';
$username = getenv('DB_USERNAME') ?: 'mknazzal_votingsite';
$password = getenv('DB_PASSWORD') ?: 'O06oF6v$B{ig';
$dbname = getenv('DB_NAME') ?: 'mknazzal_voting_github';

// Establish a secure MySQLi connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    error_log("Database connection failed: " . $conn->connect_error);
    die(json_encode(['success' => false, 'message' => 'Database connection failed.']));
}

// Prepare for user registration
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Fetch JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $conn->real_escape_string($input['username']);
    $name = $conn->real_escape_string($input['name']);
    $email = $conn->real_escape_string($input['email']);
    $password = $input['password'];

    // Check if username or email already exists
    $checkQuery = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $checkQuery->bind_param('ss', $username, $email);
    $checkQuery->execute();
    $checkQuery->store_result();

    if ($checkQuery->num_rows > 0) {
        // Username or email already exists
        echo json_encode(['success' => false, 'message' => 'Username or email is already taken.']);
    } else {
        // Register new user
        $pw_salt = bin2hex(random_bytes(16)); // Generate a random salt
        $pw_hash = password_hash($password . $pw_salt, PASSWORD_BCRYPT);
        $created_at = date('Y-m-d H:i:s'); // Current timestamp

        $insertQuery = $conn->prepare("INSERT INTO users (username, email, name, pw_salt, pw_hash, created_at) VALUES (?, ?, ?, ?, ?, ?)");
        $insertQuery->bind_param('ssssss', $username, $email, $name, $pw_salt, $pw_hash, $created_at);

        if ($insertQuery->execute()) {
            // Registration successful
            echo json_encode(['success' => true, 'message' => 'Registration successful.']);
        } else {
            // Registration failed
            error_log("Registration failed: " . $conn->error);
            echo json_encode(['success' => false, 'message' => 'Registration failed.']);
        }

        // Close insert query
        $insertQuery->close();
    }

    // Close check query
    $checkQuery->close();
}

// Close the database connection
$conn->close();
?>
