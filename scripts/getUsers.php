<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 03/02/2018
 * Time: 15:46
 * Gets all information for the users in the system, and outputs a json file with this information
 */
require('connect.php');

$sql = 'SELECT * FROM Users';

$result = $conn->query($sql);

echo json_encode($result->fetch_assoc());
