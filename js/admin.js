$(function(){
    loadUserList();
});

function loadUserList() {
    $.ajax({
        url: "/scripts/getUsers.php",
        data: '',
        success: function(result) {
            console.log(result);
        },
        dataType: 'json'
    });
}