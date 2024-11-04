<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");  // Set JSON response header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = getenv('DB_SERVER') ?: '127.0.0.1';
$username = getenv('DB_USERNAME') ?: 'mknazzal_votingsite';
$password = getenv('DB_PASSWORD') ?: 'O06oF6v$B{ig';
$dbname = getenv('DB_NAME') ?: 'mknazzal_voting_github';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['userID'], $input['title'], $input['description'], $input['answers'], $input['settings'])) {
    echo json_encode(["success" => false, "message" => "Invalid poll data provided."]);
    exit;
}

$userID = $input['userID'];
$title = $conn->real_escape_string($input['title']);
$description = $conn->real_escape_string($input['description']);
$answers = $input['answers'];
$voteOncePerIP = $input['settings']['voteOncePerIP'] ? 1 : 0;
$expiryDate = $input['settings']['expiryDate'] ?? null;

$answer1 = $answers[0] ?? null;
$answer2 = $answers[1] ?? null;
$answer3 = $answers[2] ?? null;
$answer4 = $answers[3] ?? null;
$answer5 = $answers[4] ?? null;

// Insert into options table
$optionsQuery = "INSERT INTO options (Option1, Option2, Option3, Option4, Option5) VALUES (?, ?, ?, ?, ?)";
$optionsStmt = $conn->prepare($optionsQuery);
if (!$optionsStmt) {
    echo json_encode(["success" => false, "message" => "Prepare failed for options table: " . $conn->error]);
    exit;
}
$optionsStmt->bind_param('sssss', $answer1, $answer2, $answer3, $answer4, $answer5);

if (!$optionsStmt->execute()) {
    echo json_encode(["success" => false, "message" => "Failed to save poll options: " . $optionsStmt->error]);
    exit;
}
$optionsID = $optionsStmt->insert_id;
$optionsStmt->close();

// Insert into settings table
$settingsQuery = "INSERT INTO settings (vote_expiry, vote_once) VALUES (?, ?)";
$settingsStmt = $conn->prepare($settingsQuery);
if (!$settingsStmt) {
    echo json_encode(["success" => false, "message" => "Prepare failed for settings table: " . $conn->error]);
    exit;
}
$settingsStmt->bind_param('si', $expiryDate, $voteOncePerIP);

if (!$settingsStmt->execute()) {
    echo json_encode(["success" => false, "message" => "Failed to save poll settings: " . $settingsStmt->error]);
    exit;
}
$settingsID = $settingsStmt->insert_id;
$settingsStmt->close();

$uniqueID = uniqid();
$voteURL = "$uniqueID";

$votesQuery = "INSERT INTO votes (UserID, Vote_Name, Vote_Description, Vote_Count, Vote_URL, OptionsID, SettingsID) VALUES (?, ?, ?, 0, ?, ?, ?)";
$votesStmt = $conn->prepare($votesQuery);
if (!$votesStmt) {
    echo json_encode(["success" => false, "message" => "Prepare failed for votes table: " . $conn->error]);
    exit;
}
$votesStmt->bind_param('isssii', $userID, $title, $description, $voteURL, $optionsID, $settingsID);

if ($votesStmt->execute()) {
    $pollID = $votesStmt->insert_id;

    $optionsCountQuery = "INSERT INTO optionsCount (option1Count, option2Count, option3Count, option4Count, option5Count, poll_id) VALUES (0, 0, 0, 0, 0, ?)";
    $optionsCountStmt = $conn->prepare($optionsCountQuery);
    if (!$optionsCountStmt) {
        echo json_encode(["success" => false, "message" => "Prepare failed for OptionsCount table: " . $conn->error]);
        exit;
    }
    $optionsCountStmt->bind_param('i', $pollID);

    if ($optionsCountStmt->execute()) {
        echo json_encode(["success" => true, "message" => "Poll created successfully.", "pollID" => $uniqueID]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to initialize options count: " . $optionsCountStmt->error]);
    }
    $optionsCountStmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Failed to save poll: " . $votesStmt->error]);
}
$votesStmt->close();
$conn->close();
?>
