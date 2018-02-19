<?php

require('connect.php');

$licencenumber = $_REQUEST['licencenumber'];

$sql = "DELETE FROM `Software` WHERE licenceNumber = $licencenumber";

$employeeID = $conn->query($sql);
if ($conn->error) die($conn->error);
