<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 11/02/2018
 * Time: 21:42
 *
 * Updates a note with a specified noteid
 */

require 'connect.php';

$noteid = $_REQUEST['noteid'];
$text = $_REQUEST['text'];

$sql = "UPDATE `Notes` SET `text`='$text' WHERE noteID = '$noteid'";

$result = $conn->query($sql);
if ($conn->error) die($conn->error);

echo 'success';