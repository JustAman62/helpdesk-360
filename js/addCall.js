

$(function() {
    let input = $('#create-problem-type');
    let problemTypesList = new Awesomplete(input[0]);
    problemTypesList.minChars = 0;
    $.get('scripts/getProblemTypes.php', function(result) {
       console.log(result);
       problemTypesList.list = result;
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

});