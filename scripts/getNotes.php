<?php
// Contributions by: Aman Dhoot
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 11/02/2018
 * Time: 21:29
 *
 * Returns all notes, joined with calls, for the specified ticket number
 */

require 'connect.php';


if (isset($_REQUEST['ticketnumber'])){
    $ticketnumber = $_REQUEST['ticketnumber'];
    $sql = "SELECT * FROM Notes LEFT JOIN Calls ON Notes.callID = Calls.callID WHERE Notes.ticketNumber = $ticketnumber";
}

if (isset($_REQUEST['noteid'])){
    $noteid = $_REQUEST['noteid'];
    $sql = "SELECT * FROM Notes LEFT JOIN Calls ON Notes.callID = Calls.callID WHERE Notes.noteID = $noteid";
}



$result = $conn->query($sql);
if ($conn->error) die($conn->error);

while($row = $result->fetch_object()) {
    $rows[]=$row;
}

echo json_encode($rows);
