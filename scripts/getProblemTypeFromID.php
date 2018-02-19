<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 19/02/2018
 * Time: 18:09
 * When given a problem type id, it will output the problem type info
 */

require 'connect.php';

$problemtypeid = $_REQUEST['problemtypeid'];

$sql = "SELECT * FROM ProblemTypes WHERE problemTypeID = '$problemtypeid'";
$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

echo json_encode($result->fetch_object());