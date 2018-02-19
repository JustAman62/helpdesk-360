<?php
// Contributions by: Aman Dhoot
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 13/02/2018
 * Time: 19:48
 *
 * Updates tickets based on data passed into it
 */

session_start();

require "connect.php";

$priority = $_REQUEST['priority'];
$problemtype = $_REQUEST['problemtype'];
$operatingsystem = $_REQUEST['operatingsystem'];
$problemdescription = $_REQUEST['problemdescription'];
$userid = $_SESSION['userid'];
$serialnumber = $_REQUEST['serialnumber'];
$licencenumber = $_REQUEST['licencenumber'];
$ticketnumber = $_REQUEST['ticketnumber'];
$specialistid = $_REQUEST['specialistid'];

//    Find the problemtypeid by looking up the problemtypename given
$sql = "SELECT problemTypeID FROM ProblemTypes WHERE problemTypeName = '$problemtype'";
$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

$problemtypeid = $result->fetch_row()[0];

$sql = "UPDATE `Tickets` SET `priority`='$priority',`problemTypeID`='$problemtypeid',`originalDescription`='$problemdescription',`serialNumber`=$serialnumber,`licenceNumber`=$licencenumber,`operatingSystem`='$operatingsystem', `specialistID`=$specialistid WHERE ticketNumber = $ticketnumber";

$conn->query($sql);
if($conn->error) die($conn->error);
