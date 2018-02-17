<?php

require 'connect.php';

$problemtypeid = $_REQUEST['problemtypeid'];

$sql = "SELECT * FROM ProblemTypes WHERE problemTypeID = $problemtypeid";

$result = $conn->query($sql);
if ($conn->error) die ($conn->error);

while($row = $result->fetch_object()) {
    $rows[]=$row;
}

console.log($problemtypeid);
echo json_encode($rows);

$sql1 = "SELECT Tbl1.userID, Tbl1.Problems
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
        GROUP BY Tbl.userID) AS Tbl1, Specialists
        WHERE Tbl1.userID = Specialists.userID
        AND Specialists.problemTypeID = $problemtypeid
        ORDER BY Problems";

$result1 = $conn->query($sql1);
if ($conn->error) die($conn->error);

echo json_encode($result1->fetch_all());
console.log(json_encode($result1->fetch_all());)
