<?php

require 'connect.php';

$problemtypeid = $_REQUEST['problemtypeid'];

$sql = "SELECT Tbl1.userID, Tbl1.Problems
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

$result = $conn->query($sql);
if ($conn->error) die($conn->error);

echo json_encode($result->fetch_all());
