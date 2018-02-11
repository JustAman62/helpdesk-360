<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 11/02/2018
 * Time: 16:49
 *
 * Create a new ticket based on the information given
 */

require 'connect.php';

//get information from the request
$calltime = $_REQUEST['calltime'];
$calldate = $_REQUEST['calldate'];
$priority = $_REQUEST['priority'];
$employeeid = $_REQUEST['employeeid'];
$problemtype = $_REQUEST['problemtype'];
$operatingsystem = $_REQUEST['operatingsystem'];
$problemdescription = $_REQUEST['problemdescription'];
$licencenumber = $_REQUEST['licencenumber'];
$serialnumber = $_REQUEST['serialnumber'];
$callnotes = $_REQUEST['callnotes'];
$ticketstatus = $_REQUEST['ticketstatus'];
$userid = $_REQUEST['userid'];


$datetime = DateTime::createFromFormat('d/m/Y', $calldate);
$calldate = $datetime->format('Y-m-d');


//Create a new ticket
//    Find the problemtypeid by looking up the problemtypename given
$sql = "SELECT problemTypeID FROM ProblemTypes WHERE problemTypeName = '$problemtype'";
$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

$problemtypeid = $result->fetch_row()[0]+1;

//    Find the max ticket number, so a new ticket can be added
$sql = "SELECT MAX(ticketNumber) FROM Tickets";
$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

$ticketnumber = $result->fetch_row()[0]+1;

$sql = "INSERT INTO `Tickets`(`ticketNumber`, `userID`, `employeeID`, `dateCreated`, `priority`, `problemTypeID`, `originalDescription`, `ticketStatus`, `serialNumber`, `licenceNumber`, `operatingSystem`)
        VALUES ($ticketnumber,$userid,$employeeid,'$calldate',$priority,$problemtypeid,'$problemdescription',$ticketstatus,$serialnumber,$licencenumber,'$operatingsystem')";

$conn->query($sql);
if ($conn->error) die ($conn->error);


//Create a new call for the ticket
//    Find the max call number, so a new call can be added
$sql = "SELECT MAX(callID) FROM Calls";
$result = $conn->query($sql);
if ($conn->error) die ($conn->error);
$callid = $result->fetch_row()[0]+1;

$sql = "INSERT INTO `Calls`(`callID`, `employeeID`) VALUES ($callid,$employeeid)";
$conn->query($sql);
if ($conn->error) die ($conn->error);


//Create a new note for the ticket
//    Find the max note number, so a new note can be added
$sql = "SELECT MAX(noteID) FROM Notes";
$result = $conn->query($sql);
if ($conn->error) die ($conn->error);
$noteid = $result->fetch_row()[0]+1;
$sql = "INSERT INTO `Notes` (`noteID`, `text`, `date`, `ticketNumber`, `callID`, `userID`, `time`) 
        VALUES ('$noteid', '$callnotes', '$calldate', '$ticketnumber', '$callid', '$userid', '$calltime')";


$conn->query($sql);
if ($conn->error) die ($conn->error);

echo $ticketnumber;


