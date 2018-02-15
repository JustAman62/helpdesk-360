<?php

require 'connect.php';

$problemtypeid = $_REQUEST['problemtypeid'];

$sql = "SELECT DISTINCT Users.userID
        FROM Users, Specialists
        LEFT JOIN Tickets
        ON Specialists.problemTypeID = Tickets.problemTypeID
        WHERE Users.userID = Specialists.userID
        AND Specialists.problemTypeID = 1005"

$sql = "SELECT UserID, COUNT(specialistID)
        FROM Tickets, Specialists
        GROUP BY specialistID"
