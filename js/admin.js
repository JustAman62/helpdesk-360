$(function(){
    loadEmployeeList();
    loadSoftwareList();
    loadHardwareList()

    $('#employeeModal').on('show.bs.modal', function(event) {
        let employeeID;
        if (event.relatedTarget) {
            employeeID = event.relatedTarget.dataset.employeeId;
            loadEmployeeById(employeeID)
        }
    });
});

function loadEmployeeList() {
    $.get('././scripts/getFullEmployeeDetails.php', function(result) {
        $('#user-list').html("");
        //Create list items for each user returned in the query
        for (let i in result) {
            createEmployeeItem(result[i]);
        }

        //Create a list item to allow a new user to be added
        let addUser = document.createElement('button');
        addUser.setAttribute('class', 'list-group-item list-group-item-action');
        addUser.setAttribute('onclick', 'createNewEmployee()');
        let plusSign = document.createElement('i');
        plusSign.setAttribute('class', 'icon icon-plus-circled');
        addUser.append(plusSign);
        addUser.append(document.createTextNode(' Add Employee'));

        $('#user-list').append(addUser);

        //Update the footer to show how many users are in the list
        $('#user-count').text(result.length);

    }, 'json');
}

function createEmployeeItem(user) {
    let item = document.createElement('button');
    item.setAttribute('class', 'list-group-item list-group-item-action');
    item.dataset.employeeId = user.employeeID;
    item.dataset.toggle = 'modal';
    item.dataset.target = '#employeeModal';
    item.append(document.createTextNode(user.firstName + ' ' + user.lastName + ' '));
    if (user.userID) {
        let userIcon = document.createElement('i');
        userIcon.setAttribute('class', 'icon icon-user');
        item.append(userIcon);
    }
    $('#user-list').append(item);
}

function loadEmployeeById(employeeID) {
    $.get('././scripts/getFullEmployeeDetailsByID.php', {employeeid: employeeID}, function(result) {
        // Fill in employee details in the employee modal
        $('#employee-id').val(result.employeeID);
        $('#first-name').val(result.firstName);
        $('#last-name').val(result.lastName);
        $('#job-title').val(result.jobTitle);
        $('#department').val(result.department);
        $('#contact-number').val(result.contactNumber);


    //    Check if this employee has a user account, if yes
    //    then show/hide the relevant elements and populate the fields

        if (result.userID) {
            $('#user-indicator').hide();
            $('#user-details').show();

            $('#user-id').val(result.userID);
            $('#user-password').val(result.password);
            $('#user-access-level')[0].selectedIndex = result.accessLevel;
        }
        else {
            $('#user-indicator').show();
            $('#user-details').hide();

        //    reset the value of the user fields, to prevent data inconsistencies when saving
            $('#user-id').val('');
            $('#user-password').val('');
            $('#user-access-level')[0].selectedIndex = 0;
        }
    }, 'json')
}

function createUserForEmployee() {
    let employeeID = $('#employee-id').val();
    $.get('scripts/createUserWithEmployeeID.php', {employeeid: employeeID}, function(result) {
        console.log(result);
        $('#user-indicator').hide();
        $('#user-details').show();

        $('#user-id').val(result.userid);
        $('#user-password').val(result.password);
        $('#user-access-level')[0].selectedIndex = result.accesslevel;

        loadEmployeeList();
    }, 'json');
}

function saveRecord() {
    $.get('scripts/updateEmployeeUserDetails.php', {
        employeeid: $('#employee-id').val(),
        firstname: $('#first-name').val(),
        lastname: $('#last-name').val(),
        jobtitle: $('#job-title').val(),
        department: $('#department').val(),
        contactnumber: $('#contact-number').val(),
        userid: $('#user-id').val(),
        password: $('#user-password').val(),
        accesslevel: $('#user-access-level')[0].selectedIndex
    }, function(result) {
        //On success, update the employee list
        loadEmployeeList();
        //    close the modal which this has been called from
        $('#employeeModal').modal('hide');

    });
}

function createNewEmployee() {
    $.get('scripts/createEmployee.php', function(result) {
        $('#employeeModal').modal('show');
        loadEmployeeById(result.employeeid)
        loadEmployeeList();
    }, 'json');
}

function deleteUser() {
    $.get('scripts/deleteUser.php', {userid: $('#user-id').val()}, function(result) {
        loadEmployeeById($('#employee-id').val());
        loadEmployeeList();
    });
}

function deleteEmployee() {
    deleteUser();
    $.get('scripts/deleteEmployee.php', {employeeid: $('#employee-id').val()}, function(result) {
        loadEmployeeList();
        $('#employeeModal').modal('hide');
    });
}

function loadSoftwareList() {
    $.get('././scripts/getFullSoftwareDetails.php', function(result) {
        $('#software-list').html("");
        //Create list items for each user returned in the query
        for (let i in result) {
            createSoftwareItem(result[i]);
        }

        //Update the footer to show how many users are in the list
        $('#software-count').text(result.length);

    }, 'json');
}

function createSoftwareItem(software) {
    let item = document.createElement('button');
    item.setAttribute('class', 'list-group-item list-group-item-action');
    item.dataset.software = software.licenceNumber;
    //item.dataset.toggle = 'modal';
    //item.dataset.target = '#employeeModal';
    item.append(document.createTextNode(software.licenceNumber + ' - ' + software.name + ':' + software.type + ' '));
    if (software.licenceNumber) {
        let userIcon = document.createElement('i');
        //userIcon.setAttribute('class', 'icon icon-user');
        item.append(userIcon);
    }
    $('#software-list').append(item);
}

function loadHardwareList() {
    $.get('././scripts/getFullHardwareDetails.php', function(result) {
        $('#hardware-list').html("");
        //Create list items for each hardware item returned in the query
        for (let i in result) {
            createHardwareItem(result[i]);
        }

        //Update the footer to show how many hardware is in the list
        $('#hardware-count').text(result.length);

    }, 'json');
}

function createHardwareItem(hardware) {
    let item = document.createElement('button');
    item.setAttribute('class', 'list-group-item list-group-item-action');
    item.dataset.hardware = hardware.serialNumber;
    //item.dataset.toggle = 'modal';
    //item.dataset.target = '#employeeModal';
    item.append(document.createTextNode(hardware.serialNumber + ' ' + hardware.type + ' ' + hardware.make + ' '));
    if (hardware.licenceNumber) {
        let userIcon = document.createElement('i');
        //userIcon.setAttribute('class', 'icon icon-user');
        item.append(userIcon);
    }
    $('#hardware-list').append(item);
}
