<?php

require 'connect.php';

include 'findProblemTypeName';
console.log($result);

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
        AND Specialists.problemTypeID = 1005
        ORDER BY Problems";

$result1 = $conn->query($sql1);
if ($conn->error) die($conn->error);

echo json_encode($result1->fetch_all());
