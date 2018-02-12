<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 12/02/2018
 * Time: 16:47
 *
 * closes the ticket specified by a ticketnumber
 */

require 'connect.php';

$ticketNumber = $_REQUEST['ticketnumber'];
$dateClosed = $_REQUEST['dateclosed'];

$datetime = DateTime::createFromFormat('d/m/Y', $dateClosed);
$dateClosed = $datetime->format('Y-m-d');


$sql = "UPDATE Tickets SET ticketStatus = 1, dateClosed = '$dateClosed' WHERE ticketNumber = $ticketNumber";
$conn->query($sql);
if ($conn->error) die($conn->error);