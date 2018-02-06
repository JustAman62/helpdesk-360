$(function(){
    loadUserList();
});

function loadUserList() {
    $.get('././scripts/getFullEmployeeDetails.php', function(result) {
        //Create list items for each user returned in the query
        for (let i in result) {
            createUserItem(result[i]);
        }

        //Create a list item to allow a new user to be added
        let addUser = document.createElement('button');
        addUser.setAttribute('class', 'list-group-item list-group-item-action');
        let plusSign = document.createElement('i');
        plusSign.setAttribute('class', 'icon icon-plus-circled');
        addUser.append(plusSign);
        addUser.append(document.createTextNode(' Add User'));

        $('#user-list').append(addUser);

        //Update the footer to show how many users are in the list
        $('#user-count').text(result.length);

    }, 'json');
}

function createUserItem(user) {
    let item = document.createElement('button');
    item.setAttribute('class', 'list-group-item list-group-item-action');
    item.dataset.userID = user.userID;
    item.dataset.toggle = 'modal';
    item.dataset.target = '#employeeModal';
    item.append(document.createTextNode(user.firstName + ' ' + user.lastName));
    $('#user-list').append(item);
}