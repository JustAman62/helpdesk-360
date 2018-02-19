<?php
// Contributions by: Jess McCreery, Mary Roca, Linus kurz
require 'connect.php';

$problemtype = $_REQUEST['problemtype'];
$sql = "SELECT problemTypeID FROM ProblemTypes WHERE problemTypeName = '$problemtype'";
$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

$problemtypeid = $result->fetch_row()[0];

$sql = "SELECT Employees.firstName, Employees.lastName, Tbl1.userID, Tbl1.Problems, Specialists.specialistID
        FROM
        (SELECT Tbl.userID, MAX(Tbl.Count) AS Problems
        FROM (SELECT Users.userID, COUNT(1) as Count
        FROM Tickets, Specialists, Users
        WHERE Specialists.specialistID = Tickets.specialistID
        AND Users.userID = Specialists.userID
        GROUP BY Users.userID
        UNION
        SELECT Specialists.userID, 0 AS Count
        FROM Specialists) AS Tbl, Specialists, Users
        GROUP BY Tbl.userID) AS Tbl1, Specialists, Employees
        WHERE Tbl1.userID = Specialists.userID
        AND Employees.employeeID = Specialists.userID
        AND Specialists.problemTypeID = '$problemtypeid'
        ORDER BY Problems";

$result = $conn->query($sql);
if ($conn->error) die($conn->error);

while($row = $result->fetch_object()) {
    $rows[]=$row;
}

echo json_encode($rows);
