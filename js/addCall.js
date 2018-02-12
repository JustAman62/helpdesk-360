

$(function() {
    let input = $('#create-problem-type');
    let problemTypesList = new Awesomplete(input[0]);
    problemTypesList.minChars = 0;
    $.get('scripts/getProblemTypes.php', function(result) {
       console.log(result[0]);
       let array = [];
       for (let i in result) {
           array.push(result[i][0]);
       }
       problemTypesList.list = array;
    }, 'json');

    input.on('focus', function() {
       problemTypesList.evaluate();
       problemTypesList.open();
    });

    input = $('#create-OS');
    let OSList = new Awesomplete(input[0]);
    OSList.minChars = 0;
    OSList.sort = false;
    OSList.list = ['Windows XP', 'Windows Vista', 'Windows 7', 'Windows 8', 'Windows 10', 'Linux', 'MacOS 10.10 Yosemite', 'MacOS 10.11 El Capitan', 'MacOS 10.12 Sierra' , 'MacOS 10.13 High Sierra']
    input.on('focus', function() {
        OSList.evaluate();
        OSList.open();
    });


    $('#create-time').timepicker({
        minTime: '09:00am',
        step: 15,
        scrollDefault: 'now'
    });
    $('#create-time').timepicker('setTime', new Date());

    $('#create-call-date').datepicker({
        format: 'dd/mm/yyyy'
    });
    $('#create-call-date').datepicker('setValue', new Date());
    $('#add-call-time').timepicker({
        minTime: '09:00am',
        step: 15,
        scrollDefault: 'now'
    });
    $('#add-call-time').timepicker('setTime', new Date());

    $('#add-call-date').datepicker({
        format: 'dd/mm/yyyy'
    });
    $('#add-call-date').datepicker('setValue', new Date());
});

function checkCreateEmployeeDetails() {
    let employeeID = $('#create-employee-id').val();
    $.get('scripts/checkDetails.php', {employeeid: employeeID}, function(result) {
        if (result) {
            $('#create-employee-id').addClass('is-valid').removeClass('is-invalid')
                .next().children().addClass('btn-success').removeClass('btn-secondary btn-danger');
            $('#create-employee-name').val(result.firstName + ' ' + result.lastName).addClass('is-valid').removeClass('is-invalid');
            $('#create-employee-contact-number').val(result.contactNumber).addClass('is-valid').removeClass('is-invalid');
        }
        else {
            $('#create-employee-id').addClass('is-invalid').removeClass('is-valid')
                .next().children().addClass('btn-danger').removeClass('btn-secondary btn-success');
            $('#create-employee-name').val("").removeClass('is-valid').removeClass('is-invalid');
            $('#create-employee-contact-number').val("").removeClass('is-valid').removeClass('is-invalid');
        }
    }, 'json')
}

function checkAddEmployeeDetails() {
    let employeeID = $('#add-employee-id').val();
    $.get('scripts/checkDetails.php', {employeeid: employeeID}, function(result) {
        if (result) {
            $('#add-employee-id').addClass('is-valid').removeClass('is-invalid')
                .next().children().addClass('btn-success').removeClass('btn-secondary btn-danger');
            $('#add-employee-name').val(result.firstName + ' ' + result.lastName).addClass('is-valid').removeClass('is-invalid');
            $('#add-employee-contact-number').val(result.contactNumber).addClass('is-valid').removeClass('is-invalid');
        }
        else {
            $('#add-employee-id').addClass('is-invalid').removeClass('is-valid')
                .next().children().addClass('btn-danger').removeClass('btn-secondary btn-success');
            $('#add-employee-name').val("").removeClass('is-valid').removeClass('is-invalid');
            $('#add-employee-contact-number').val("").removeClass('is-valid').removeClass('is-invalid');
        }
    }, 'json')
}

function createNewTicket() {
//    TODO: implement validation
    let calltime = $('#create-time').val();
    calltime = calltime.substring(0, calltime.length-2) + ':00';

    $.get('scripts/createTicket.php', {
        calltime: calltime,
        calldate: $('#create-call-date').val(),
        priority: $('#create-priority')[0].selectedIndex,
        employeeid: $('#create-employee-id').val(),
        problemtype: $('#create-problem-type').val(),
        operatingsystem: $('#create-OS').val(),
        problemdescription: $('#create-problem-description').val(),
        licencenumber: $('#create-licence-number').val() ? $('#create-licence-number').val() : undefined,
        serialnumber: $('#create-serial-number').val() ? $('#create-serial-number').val() : undefined,
        callnotes: $('#create-notes').val(),
        ticketstatus: 0,
    //    todo: send correct userid when sending request
    }, function(result) {
        console.log(result);

        if ($.isNumeric(result)) window.location.href='ticket.php?ticketNum=' + result;
    }, 'json');
}
function createNewCallNote() {
//    TODO: implement validation
    let calltime = $('#add-call-time').val();
    calltime = calltime.substring(0, calltime.length-2) + ':00';

    $.get('scripts/createNote.php', {
        calltime: calltime,
        calldate: $('#add-call-date').val(),
        employeeid: $('#add-employee-id').val(),
        notes: $('#add-notes').val(),
        ticketnumber: $('#add-ticket-number').val()
        //    todo: send correct userid when sending request

    }, function(result) {
        console.log(result);
        if ($.isNumeric(result)) window.location.href='ticket.php?ticketNum=' + result;
    }, 'json');

}