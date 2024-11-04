<?php
// Enable detailed error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database configuration
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = getenv('DB_SERVER') ?: '127.0.0.1';
$username = getenv('DB_USERNAME') ?: 'mknazzal_votingsite';
$password = getenv('DB_PASSWORD') ?: 'O06oF6v$B{ig';
$dbname = getenv('DB_NAME') ?: 'mknazzal_voting_github';

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Get poll ID from the URL
$pollId = $_GET['pollId'] ?? null;

// Validate poll ID
if (!$pollId) {
    echo json_encode(["success" => false, "message" => "Poll ID not provided."]);
    exit;
}

// Query to retrieve poll details (adjust column names as per your database schema)
$pollQuery = "
    SELECT p.ID, p.Vote_Name AS title, p.Vote_Description AS description, p.Vote_URL AS url, 
           o.Option1, o.Option2, o.Option3, o.Option4, o.Option5, 
           s.vote_expiry AS expiryDate, s.vote_once AS voteOncePerIP 
    FROM votes p
    JOIN options o ON p.OptionsID = o.ID
    JOIN settings s ON p.SettingsID = s.ID
    WHERE p.Vote_URL = ?
";

$pollStmt = $conn->prepare($pollQuery);
if (!$pollStmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare statement: " . $conn->error]);
    exit;
}

$pollStmt->bind_param("s", $pollId);

if (!$pollStmt->execute()) {
    echo json_encode(["success" => false, "message" => "Failed to execute statement: " . $pollStmt->error]);
    exit;
}

// Bind the result columns to variables
$pollStmt->bind_result($ID, $title, $description, $url, $option1, $option2, $option3, $option4, $option5, $expiryDate, $voteOncePerIP);

// Fetch the result
if (!$pollStmt->fetch()) {
    echo json_encode(["success" => false, "message" => "Poll not found."]);
    exit;
}

// Format response data
$response = [
    "success" => true,
    "poll" => [
        "id" => $ID,
        "title" => $title,
        "description" => $description,
        "url" => $url,
        "answers" => array_filter([$option1, $option2, $option3, $option4, $option5]),
        "settings" => [
            "expiryDate" => $expiryDate,
            "voteOncePerIP" => (bool)$voteOncePerIP
        ]
    ]
];

// Output the JSON response
echo json_encode($response);

// Close connections
$pollStmt->close();
$conn->close();
?>
