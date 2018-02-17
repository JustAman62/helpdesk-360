<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 10/02/2018
 * Time: 18:09
 *
 * retrieve the specified problem type
 */

require 'connect.php';

$problemtypeid = $_REQUEST['problemtypeid'];

$sql = "SELECT * FROM ProblemTypes WHERE problemTypeID = $problemtypeid";

$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

while($row = $result->fetch_object()) {
    $rows[]=$row;
}
console.log($rows);

echo json_encode($rows);