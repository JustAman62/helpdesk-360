<?php

require('connect.php');

$sql = "SELECT * FROM Users WHERE employeeid='".$_REQUEST["user"]. "' and password = '". $_REQUEST["password"]."'");

$result = $conn->query($sql);

if ($conn->error) die($conn->error);

echo json_encode($result->fetch_object());
