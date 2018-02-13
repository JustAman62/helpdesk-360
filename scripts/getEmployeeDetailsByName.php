<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 13/02/2018
 * Time: 21:28
 */

$firstName = $_REQUEST['firstname'];
$lastName = $_REQUEST['lastname'];

require 'connect.php';

$sql = "SELECT * FROM Employees WHERE (firstName LIKE '%$firstName%') OR (lastName LIKE '%$lastName%')";
$result = $conn->query($sql);
if ($conn->error) die($conn->error);


while($row = $result->fetch_object()) {
    $rows[]=$row;
}

echo json_encode($rows);