// Contributions by: Jess McCreery
<?php
require 'connect.php';

// Check serial number
if ($_REQUEST['serialnumber']) {
    $serialnumber = $_REQUEST['serialnumber'];
    $sql = "SELECT * FROM Equipment WHERE serialNumber = $serialnumber";

    $result = $conn->query($sql);
    if ($conn->error) die($conn->error);

    echo json_encode($result->fetch_object());
    return;
}
