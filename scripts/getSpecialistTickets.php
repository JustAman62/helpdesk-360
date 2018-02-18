<?php

require 'connect.php';

$userid = $_SESSION['userid'];
console.log($userid);

$sql = "SELECT Tickets.ticketNumber, Tickets.userID, Tickets.employeeID, Tickets.dateCreated, Tickets.dateClosed, Tickets.priority, Tickets.problemTypeID, Tickets.originalDescription, Tickets.specialistID, Tickets.ticketStatus, Tickets.serialNumber, Tickets.licenceNumber, Tickets.operatingSystem
        FROM Tickets, Specialists, Employees
        WHERE Specialists.specialistID = Tickets.specialistID
        AND Employees.employeeID = Specialists.userID
        AND Employees.employeeID = $userid";

$result = $conn->query($sql);
if ($conn->error) die($conn->error);

while($row = $result->fetch_object()) {
    $rows[]=$row;
}

echo json_encode($rows);
