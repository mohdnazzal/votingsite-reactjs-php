<?php
// Enable detailed error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database configuration
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = getenv('DB_SERVER') ?: '';
$username = getenv('DB_USERNAME') ?: '';
$password = getenv('DB_PASSWORD') ?: '';
$dbname = getenv('DB_NAME') ?: '';

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

// Query to retrieve the vote counts for each option
$countQuery = "
    SELECT option1Count, option2Count, option3Count, option4Count, option5Count
    FROM optionsCount
    WHERE poll_id = ?
";

$countStmt = $conn->prepare($countQuery);
if (!$countStmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare statement: " . $conn->error]);
    exit;
}

$countStmt->bind_param("s", $pollId);

if (!$countStmt->execute()) {
    echo json_encode(["success" => false, "message" => "Failed to execute statement: " . $countStmt->error]);
    exit;
}

// Bind the result columns to variables
$countStmt->bind_result($option1Count, $option2Count, $option3Count, $option4Count, $option5Count);

// Fetch the result
if (!$countStmt->fetch()) {
    echo json_encode(["success" => false, "message" => "Vote counts not found for this poll."]);
    exit;
}

// Format response data
$response = [
    "success" => true,
    "voteCounts" => [
        "option1Count" => $option1Count,
        "option2Count" => $option2Count,
        "option3Count" => $option3Count,
        "option4Count" => $option4Count,
        "option5Count" => $option5Count
    ]
];

// Output the JSON response
echo json_encode($response);

// Close connections
$countStmt->close();
$conn->close();
?>
