<?php
// Enable detailed error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database configuration
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

// Get user ID from the URL
$userID = $_GET['userID'] ?? null;

// Validate user ID
if (!$userID) {
    echo json_encode(["success" => false, "message" => "User ID not provided."]);
    exit;
}

// Query to retrieve all polls for a specific user along with options, option counts, and settings
$pollQuery = "
    SELECT p.ID AS pollID, p.Vote_Name AS title, p.Vote_Description AS description, p.Vote_Count AS voteCount, p.Vote_URL,
           o.Option1, o.Option2, o.Option3, o.Option4, o.Option5,
           oc.option1Count, oc.option2Count, oc.option3Count, oc.option4Count, oc.option5Count,
           s.vote_expiry AS expiryDate, s.vote_once AS voteOncePerIP
    FROM votes p
    JOIN options o ON p.OptionsID = o.ID
    JOIN optionsCount oc ON p.ID = oc.poll_id
    JOIN settings s ON p.SettingsID = s.ID
    WHERE p.UserID = ?
";

$pollStmt = $conn->prepare($pollQuery);
if (!$pollStmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare statement: " . $conn->error]);
    exit;
}

$pollStmt->bind_param("s", $userID);

if (!$pollStmt->execute()) {
    echo json_encode(["success" => false, "message" => "Failed to execute statement: " . $pollStmt->error]);
    exit;
}

// Bind the result columns to variables
$pollStmt->bind_result($pollID, $title, $description, $voteCount, $Vote_URL, $option1, $option2, $option3, $option4, $option5,
                       $option1Count, $option2Count, $option3Count, $option4Count, $option5Count, $expiryDate, $voteOncePerIP);

$polls = [];
while ($pollStmt->fetch()) {
    $polls[] = [
        "id" => $pollID,
        "title" => $title,
        "description" => $description,
        "voteCount" => $voteCount,
        "vote_url" => $Vote_URL,
        "options" => [
            $option1, $option2, $option3, $option4, $option5
        ],
        "optionsCount" => [
            $option1Count, $option2Count, $option3Count, $option4Count, $option5Count
        ],
        "settings" => [
            "expiryDate" => $expiryDate,
            "voteOncePerIP" => (bool)$voteOncePerIP
        ]
    ];
}

// Output the JSON response
echo json_encode(["success" => true, "polls" => $polls]);

// Close connections
$pollStmt->close();
$conn->close();
?>
