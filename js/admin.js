$(function(){
    loadUserList();
});

function loadUserList() {
    $.get('././scripts/getFullUserDetails.php', function(result) {
        for (let i in result) {
            createUserItem(result[i]);
        }
        $('#user-count').text(result.length);
        console.log(result);
    }, 'json');
}

function createUserItem(user) {
    let item = document.createElement('button');
    item.setAttribute('class', 'list-group-item list-group-item-action');
    item.append(document.createTextNode(user.userID));
    $('#user-list').append(item);
}