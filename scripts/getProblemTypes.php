<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 10/02/2018
 * Time: 18:09
 *
 * retrieve all problem types in the problem types table
 */

require 'connect.php';

$sql = "SELECT problemTypeName FROM ProblemTypes";

$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

echo json_encode($result->fetch_all());