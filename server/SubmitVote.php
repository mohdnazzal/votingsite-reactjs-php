<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

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

// Parse JSON input
$data = json_decode(file_get_contents("php://input"), true);
$pollId = $data['pollId'] ?? null; // URL ID for poll
$VoteId = $data['Id'] ?? null; // DB poll_id
$answer = $data['answer'] ?? null;

// Validate poll ID, Vote ID, and answer input
if (!$pollId || !$VoteId || !$answer) {
    echo json_encode(["success" => false, "message" => "Invalid poll ID, Vote ID, or answer."]);
    exit;
}

// Get client IP address
$ip = $_SERVER['REMOTE_ADDR'];

// Check if user has already voted based on IP
$checkVoteQuery = "SELECT COUNT(*) as vote_count FROM votes_ip WHERE poll_id = ? AND ip_address = ?";
$stmt = $conn->prepare($checkVoteQuery);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare check vote query: " . $conn->error]);
    exit;
}

$stmt->bind_param("ss", $VoteId, $ip);
$stmt->execute();
$stmt->bind_result($vote_count);
$stmt->fetch();
$stmt->close();

// if ($vote_count > 0) {
//     echo json_encode(["success" => false, "message" => "You have already voted."]);
//     exit;
// }

// Prepare query to retrieve options
$checkOptionsQuery = "
    SELECT options.Option1, options.Option2, options.Option3, options.Option4, options.Option5 
    FROM votes 
    INNER JOIN options ON votes.OptionsID = options.ID 
    WHERE votes.ID = ?
";
$optionsStmt = $conn->prepare($checkOptionsQuery);

if (!$optionsStmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare options query: " . $conn->error]);
    exit;
}

$optionsStmt->bind_param("s", $VoteId);
$optionsStmt->execute();
$optionsStmt->bind_result($option1, $option2, $option3, $option4, $option5);
$optionsStmt->fetch();
$optionsStmt->close();

if (!$option1 && !$option2 && !$option3 && !$option4 && !$option5) {
    echo json_encode(["success" => false, "message" => "No options found for this vote ID."]);
    exit;
}

// Define allowed answers and map them to the database columns
$allowedAnswers = [$option1, $option2, $option3, $option4, $option5];
$answerIndex = array_search($answer, $allowedAnswers);

if ($answerIndex === false) {
    echo json_encode(["success" => false, "message" => "Invalid answer option."]);
    exit;
}

// Construct the column name based on the answer index
$column = "option" . ($answerIndex + 1) . "Count";

// Update vote count for the selected answer
$updateQuery = "UPDATE optionsCount SET `$column` = `$column` + 1 WHERE poll_id = ?";
$updateStmt = $conn->prepare($updateQuery);

if (!$updateStmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare update query: " . $conn->error]);
    exit;
}

$updateStmt->bind_param("s", $VoteId);

if ($updateStmt->execute()) {
    if ($updateStmt->affected_rows > 0) {
        // Record the IP address to prevent multiple votes
        $insertIpQuery = "INSERT INTO votes_ip (poll_id, ip_address) VALUES (?, ?)";
        $stmtIp = $conn->prepare($insertIpQuery);
        $stmtIp->bind_param("ss", $VoteId, $ip);
        $stmtIp->execute();
        $stmtIp->close();

        echo json_encode(["success" => true, "message" => "Vote submitted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update vote count. Poll ID may not exist."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Failed to update vote count."]);
}

// Close connections
$updateStmt->close();
$conn->close();
?>
