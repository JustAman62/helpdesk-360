<?php
// Contributions by: Jess McCreery

require('connect.php');

$licencenumber = $_REQUEST['licencenumber'];

$sql = "DELETE FROM `Software` WHERE licenceNumber = $licencenumber";
