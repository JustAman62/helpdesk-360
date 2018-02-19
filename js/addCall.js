// Contributions by: Jess McCreery, Aman Dhoot, Mary Roca, Linus kurz
let nameList;
let specialistList;

$(function() {
    let input = $('#create-problem-type');
    let problemTypesList = new Awesomplete(input[0]);
    problemTypesList.minChars = 0;
    $.get('scripts/getProblemTypes.php', function(result) {
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

    let createTime = $('#create-time');
    createTime.timepicker({
        minTime: '09:00am',
        step: 15,
        scrollDefault: 'now',
        timeFormat: 'H:i'
    });
    createTime.timepicker('setTime', new Date());

    $('#create-call-date').datepicker({
        format: 'dd/mm/yyyy'
    });
    $('#create-call-date').datepicker('setValue', new Date());
    $('#add-call-time').timepicker({
        minTime: '09:00am',
        step: 15,
        scrollDefault: 'now',
        timeFormat: 'H:i'
    });
    $('#add-call-time').timepicker('setTime', new Date());

    $('#add-call-date').datepicker({
        format: 'dd/mm/yyyy'
    });
    $('#add-call-date').datepicker('setValue', new Date());

    $('#nameModal').on('show.bs.modal', function(event) {
        let list = $('#name-list');
        list.html("");
        //    Make a list item
        for (let i in nameList) {
            let listItem = document.createElement('button')
            listItem.setAttribute('type', 'button');
            listItem.setAttribute('class', 'list-group-item list-group-item-action');
            listItem.setAttribute('onclick', "javascript:chooseName(" + i + ")");
            listItem.appendChild(document.createTextNode(nameList[i].firstName + ' ' + nameList[i].lastName + '   ' + nameList[i].contactNumber));
            $('#name-list').append(listItem);
        }
    });
    $('#specialistModal').on('show.bs.modal', function(event) {
        let list = $('#specialist-list');
        list.html("");
        //    Make a list item
        for (let i in specialistList) {
            let listItem = document.createElement('button')
            listItem.setAttribute('type', 'button');
            listItem.setAttribute('class', 'list-group-item list-group-item-action');
            listItem.setAttribute('onclick', "javascript:chooseSpecialist(this)");
            listItem.dataset.specialistId = specialistList[i].specialistID;
            listItem.dataset.firstName = specialistList[i].firstName;
            listItem.dataset.lastName = specialistList[i].lastName;
            listItem.appendChild(document.createTextNode(specialistList[i].firstName + ' ' + specialistList[i].lastName + '   ' + specialistList[i].Problems));
            $('#specialist-list').append(listItem);
        }
    });

});

function checkCreateEmployeeDetails() {
    let employeeID = $('#create-employee-id').val();
    $.get('scripts/checkDetails.php', {employeeid: employeeID}, function(result) {
        if (result) {
            $('#create-employee-id').addClass('is-valid').removeClass('is-invalid')
                .next().children().addClass('btn-success').removeClass('btn-secondary btn-danger');
            $('#create-employee-name').val(result.firstName + ' ' + result.lastName).addClass('is-valid').removeClass('is-invalid')
                .next().children().addClass('btn-success').removeClass('btn-secondary btn-danger');
            $('#create-employee-contact-number').val(result.contactNumber).addClass('is-valid').removeClass('is-invalid');
        }
        else {
            $('#create-employee-id').addClass('is-invalid').removeClass('is-valid')
                .next().children().addClass('btn-danger').removeClass('btn-secondary btn-success');
            $('#create-employee-name').val("").removeClass('is-valid').addClass('is-invalid')
                .next().children().addClass('btn-danger').removeClass('btn-secondary btn-success');
            $('#create-employee-contact-number').val("").removeClass('is-valid').addClass('is-invalid');
        }
    }, 'json')
}

function assignNewSpecialist(){
    $.get('scripts/assignSpecialist.php', {problemtype: $('#create-problem-type').val()}, function(result) {
        specialistList = result;
        $('#specialistModal').modal('show');
    }, 'json');
}
function chooseSpecialist(element) {
    let specialist = $('#assigned-specialist-name');
    specialist.val(element.dataset.firstName + " " + element.dataset.lastName);
    specialist[0].dataset.specialistId = element.dataset.specialistId;

    $('#specialistModal').modal('hide');
}


function checkSoftware() {
    let licenceNumber = $('#create-licence-number').val();
    $.get('scripts/checkLicence.php', {licencenumber: licenceNumber}, function(result) {
        if (result) {
            $('#create-licence-number').addClass('is-valid').removeClass('is-invalid')
                .next().children().addClass('btn-success').removeClass('btn-secondary btn-danger');
        }
        else {
            $('#create-licence-number').addClass('is-invalid').removeClass('is-valid')
                .next().children().addClass('btn-danger').removeClass('btn-secondary btn-success');
        }
    }, 'json')
}

function checkHardware() {
    let serialNumber = $('#create-serial-number').val();
    $.get('scripts/checkSerialNumber.php', {serialnumber: serialNumber}, function(result) {
        if (result) {
            $('#create-serial-number').addClass('is-valid').removeClass('is-invalid')
                .next().children().addClass('btn-success').removeClass('btn-secondary btn-danger');
        }
        else {
            $('#create-serial-number').addClass('is-invalid').removeClass('is-valid')
                .next().children().addClass('btn-danger').removeClass('btn-secondary btn-success');
        }
    }, 'json')
}

function checkTicketNumber() {
    let ticketnumber = $('#add-ticket-number').val();
    $.get('scripts/checkTicketNumber.php', {ticketnumber: ticketnumber}, function(result) {
        if (result) {
            $('#add-ticket-number').addClass('is-valid').removeClass('is-invalid')
                .next().children().addClass('btn-success').removeClass('btn-secondary btn-danger');
        }
        else {
            $('#add-ticket-number').addClass('is-invalid').removeClass('is-valid')
                .next().children().addClass('btn-danger').removeClass('btn-secondary btn-success');
        }
    }, 'json')
}

function checkCreateEmployeeName() {
    let firstName = "";
    let lastName = "";
    let name = $('#create-employee-name').val();
    name = name.split(" ");
    if (name.length === 1) {
        firstName = name[0];
        lastName = name[0];
    }
    else {
        firstName = name[0];
        lastName = name[1];
    }

    $.get('scripts/getEmployeeDetailsByName.php', {firstname: firstName, lastname: lastName}, function(result) {
        if (result) {
            nameList = result;
            $('#nameModal').modal('show');
        }
        else {
            $('#create-employee-id').addClass('is-invalid').removeClass('is-valid')
                .next().children().addClass('btn-danger').removeClass('btn-secondary btn-success');
            $('#create-employee-name').val("").removeClass('is-valid').addClass('is-invalid')
                .next().children().addClass('btn-danger').removeClass('btn-secondary btn-success');
            $('#create-employee-contact-number').val("").removeClass('is-valid').addClass('is-invalid');
        }
    }, 'json')
}

function chooseName(index) {
    $('#create-employee-id').val(nameList[index].employeeID).addClass('is-valid').removeClass('is-invalid')
        .next().children().addClass('btn-success').removeClass('btn-secondary btn-danger');
    $('#create-employee-name').val(nameList[index].firstName + ' ' + nameList[index].lastName).addClass('is-valid').removeClass('is-invalid')
        .next().children().addClass('btn-success').removeClass('btn-secondary btn-danger');
    $('#create-employee-contact-number').val(nameList[index].contactNumber).addClass('is-valid').removeClass('is-invalid');
    $('#nameModal').modal('hide');
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
            $('#add-employee-name').val("").removeClass('is-valid').addClass('is-invalid');
            $('#add-employee-contact-number').val("").removeClass('is-valid').addClass('is-invalid');
        }
    }, 'json')
}

function createNewTicket() {
//    TODO: implement validation
    let calltime = $('#create-time').val() + ':00';
    let specialistID = "NULL";
    if ($('#assigned-specialist-name')[0].dataset.specialistId) {
        specialistID = $('#assigned-specialist-name')[0].dataset.specialistId;
    }


    $.get('scripts/createTicket.php', {
        calltime: calltime,
        calldate: $('#create-call-date').val(),
        priority: $('#create-priority')[0].selectedIndex,
        employeeid: $('#create-employee-id').val(),
        problemtype: $('#create-problem-type').val(),
        operatingsystem: $('#create-OS').val(),
        specialistname: $('#available-Specialists').val(),
        problemdescription: $('#create-problem-description').val(),
        licencenumber: $('#create-licence-number').val() ? $('#create-licence-number').val() : undefined,
        serialnumber: $('#create-serial-number').val() ? $('#create-serial-number').val() : undefined,
        callnotes: $('#create-notes').val(),
        ticketstatus: 0,
        specialistid: specialistID
    }, function(result) {
        console.log(result);

        if ($.isNumeric(result)) window.location.href='ticket.php?ticketNum=' + result;
    }, 'json');
}

function createNewCallNote() {
//    TODO: implement validation
    let calltime = $('#add-call-time').val() + ':00';

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
