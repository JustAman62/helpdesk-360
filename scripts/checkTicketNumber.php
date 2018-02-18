<?php

require 'connect.php';

// Check Employee ID
if ($_REQUEST['ticketnumber']) {
    $ticketnumber = $_REQUEST['ticketnumber'];
    $sql = "SELECT * FROM tickets WHERE ticketNumber = $ticketnumber";

    $result = $conn->query($sql);
    if ($conn->error) die($conn->error);

    echo json_encode($result->fetch_object());
    return;
}
