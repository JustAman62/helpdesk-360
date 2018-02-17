<?php
/**
 * Created by PhpStorm.
 * User: daniel
 * Date: 17/02/2018
 * Time: 20:45
 */
require 'connect.php';

$sql = "SELECT problemTypeID FROM ProblemTypes";

$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

echo json_encode($result->fetch_all());