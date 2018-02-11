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

$sql = "SELECT problemTypeName FROM ProblemTypes WHERE problemTypeID = $problemtypeid";

$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

echo json_encode($result->fetch_all());