<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 19/02/2018
 * Time: 14:30
 */

require 'connect.php';

$problemtype = $_REQUEST['problemtype'];

$sql = "SELECT * FROM ProblemTypes WHERE problemTypeName = '$problemtype'";
$result = $conn->query($sql);
if ($conn->error) die ($conn->error);


while($row = $result->fetch_object()) {
    $rows[]=$row;
}

echo json_encode($rows);