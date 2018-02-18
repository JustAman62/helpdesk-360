<?php

require('connect.php');

$sql = "SELECT * FROM Hardware";

$result = $conn->query($sql);

if ($conn->error) die($conn->error);


while($row = $result->fetch_object()) {
    $rows[]=$row;
}

echo json_encode($rows);
