$(function() {
    $('#login-failure').hide()
})


function login() {
    $.get('scripts/userLogin.php',{userid:$('#user-id').val(), password: $('#password').val(), acesslevel: $('#acess-level').val()}, function(result) {
        console.log(result)
        if (result === 'both') {
            window.location.href = 'index.php';
        }
        else if (result === 'specialist') {
            window.location.href = 'specialistHome.php';
        }
        else {
            console.log('well duck');
            $('#user-id').addClass('is-invalid');
            $('#password').addClass('is-invalid');
            $('#login-failure').show();
        }
    })
}