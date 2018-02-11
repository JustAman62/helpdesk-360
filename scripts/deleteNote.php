<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 11/02/2018
 * Time: 22:56
 *
 * deletes the specified note, and if need the related call
 */

require 'connect.php';

$noteId = $_REQUEST['noteid'];

$sql = "DELETE FROM `Notes` WHERE noteID = $noteId";

$conn->query($sql);
if ($conn->error) die($conn->error);

echo 'success';