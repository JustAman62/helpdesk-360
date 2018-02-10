$(function(){
    loadEmployeeList();

    $('#employeeModal').on('show.bs.modal', function(event) {
        let employeeID = event.relatedTarget.dataset.employeeId;
        loadEmployeeById(employeeID)
    });
});

function loadEmployeeList() {
    $.get('././scripts/getFullEmployeeDetails.php', function(result) {
        //Create list items for each user returned in the query
        for (let i in result) {
            createEmployeeItem(result[i]);
        }

        //Create a list item to allow a new user to be added
        let addUser = document.createElement('button');
        addUser.setAttribute('class', 'list-group-item list-group-item-action');
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
        }
    }, 'json')
}

function createUserForEmployee() {
    let employeeID = $('#employee-id').val();
    $.get('scripts/createUserWithEmployeeID.php', {employeeid: employeeID}, function(result) {
        console.log(result);
    }, 'json');
}