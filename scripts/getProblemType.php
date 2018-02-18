<?php

require 'connect.php';

$problemtype = $_REQUEST['problemtype'];

$sql = "SELECT problemType FROM ProblemTypes WHERE problemType = ''$problemtype'";
$result = $conn->query($sql);
if ($conn->error) die($conn->error);


echo json_encode($result->fetch_object());
