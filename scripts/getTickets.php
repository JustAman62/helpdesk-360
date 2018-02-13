<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 11/02/2018
 * Time: 19:52
 *
 * Gets the info for a specified ticket is ticketnum is supplied, otherwise returns all tickets
 */

require 'connect.php';

$sort = $_REQUEST['sort'];

$sql = "SELECT * FROM Tickets ORDER BY '$sort'";

if (isset($_REQUEST['ticketnum'])) {
    $ticketnum = $_REQUEST['ticketnum'];
    $sql = "SELECT * FROM Tickets WHERE ticketNumber = $ticketnum";
}

$result = $conn->query($sql);
if ($conn->error) die($conn->error);

while($row = $result->fetch_object()) {
    $rows[]=$row;
}

echo json_encode($rows);