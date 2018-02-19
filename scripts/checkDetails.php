// Contributions by: Aman Dhoot
<?php
/**
 * Created by PhpStorm.
 * User: adhoot
 * Date: 11/02/2018
 * Time: 16:05
 *
 * Check to see if a record exists in a table,
 * should check (and return):
 * - Employee ID in Employees Table (Return Name, Contact Number)
 * - Licence Number in Software table (Return Licence Number)
 * - Serial Number in Equipment Table (Return Serial Number, Unique Identifier)
 * - Unique Identifier in Equipment Table (Return Serial Number, Unique Identifier)
 * - Ticket Number in tickets table (Return Employee details)
 */

require 'connect.php';

// Check Employee ID
if ($_REQUEST['employeeid']) {
    $employeeid = $_REQUEST['employeeid'];
    $sql = "SELECT * FROM Employees WHERE employeeID = $employeeid";

    $result = $conn->query($sql);
    if ($conn->error) die($conn->error);

    echo json_encode($result->fetch_object());
    return;
}
