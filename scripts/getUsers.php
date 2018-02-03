<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 03/02/2018
 * Time: 15:46
 * Gets all information for the users in the system, and outputs a json file with this information
 */

include 'getUsers.php'; // For db information

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die('Connection failed'.$conn->connect_error);
}

echo 'connection successful';