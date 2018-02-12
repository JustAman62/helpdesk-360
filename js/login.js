$(function() {
    $('#login-failure').hide()
})


function login() {
    $.get('scripts/userLogin.php',{userid:$('#user-id').val(), password: $('#password').val()}, function(result) {
        if (result === 'success') {
            window.location.href = 'index.php';
        }
        else {
            console.log('well fuck');
            $('#user-id').addClass('is-invalid');
            $('#password').addClass('is-invalid');
            $('#login-failure').show();
        }
    })
}