<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 11/02/2018
 * Time: 17:57
 *
 * Creates a new note, and call if required to, for a specified ticket number
 */

require 'connect.php';

print_r($_REQUEST);
$ticketnumber = $_REQUEST['ticketnumber'];
$notes = $_REQUEST['notes'];
$userid = $_REQUEST['userid'];
$calldate = $_REQUEST['calldate'];
$calltime = $_REQUEST['calltime'];

$datetime = DateTime::createFromFormat('d/m/Y', $calldate);
$calldate = $datetime->format('Y-m-d');


//Find the next noteid
$sql = "SELECT MAX(noteID) FROM Notes";
$result = $conn->query($sql);
if ($conn->error) die ($conn->error);
$noteid = $result->fetch_row()[0]+1;

//Create the sql statement for creating a new note
$noteSQL = "INSERT INTO `Notes`(`noteID`, `text`, `date`, `ticketNumber`, `userID`, `time`)
        VALUES ('$noteid','$notes','$calldate','$ticketnumber',$userid,$calltime)";

if (isset($_REQUEST['employeeid'])) {
    $employeeid = $_REQUEST['employeeid'];


//    create a new call if the employee id is specified
    //    Find the max call number, so a new call can be added
    $sql = "SELECT MAX(callID) FROM Calls";
    $result = $conn->query($sql);
    if ($conn->error) die ($conn->error);
    $callid = $result->fetch_row()[0]+1;

    $sql = "INSERT INTO `Calls`(`callID`, `employeeID`) VALUES ($callid,$employeeid)";
    $conn->query($sql);
    if ($conn->error) die ($conn->error);

    //    change the new note sql to include a callid
    $noteSQL = "INSERT INTO `Notes` (`noteID`, `text`, `date`, `ticketNumber`, `callID`, `userID`, `time`)
        VALUES ('$noteid', '$notes', '$calldate', '$ticketnumber', '$callid', '$userid', '$calltime')";

}

//create the new note

$conn->query($noteSQL);
if ($conn->error) die ($conn->error);

echo $ticketnumber;
