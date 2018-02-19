// Contributions by: Aman Dhoot
<?php

require 'connect.php';

// Check Ticket Number
if ($_REQUEST['ticketnumber']) {
    $ticketnumber = $_REQUEST['ticketnumber'];
    $sql = "SELECT * FROM Tickets WHERE ticketNumber = $ticketnumber";

    $result = $conn->query($sql);
    if ($conn->error) die($conn->error);

    echo json_encode($result->fetch_object());
    return;
}
