<?php
// Contributions by: Aman Dhoot

  include 'database-details.php'; // For db information

  $conn = new mysqli($host, $username, $password, $dbName);

  if ($conn->connect_error) {
      die('Connection failed'.$conn->connect_error);
  }

?>
