<?php
// Contributions by: Jess McCreery

require('connect.php');

$serialnumber = $_REQUEST['serialnumber'];

$sql = "SELECT * FROM Equipment WHERE serialNumber = '$serialnumber'";

$result = $conn->query($sql);

if ($conn->error) die($conn->error);

echo json_encode($result->fetch_object());
