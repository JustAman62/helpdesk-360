var filteredArr = [];
function charts4(){
    $.get('scripts/getFullEmployeeDetails.php', function (result) {
        console.log(result);



        result.forEach(function(object){
            var filterArr = new Array();
            filterArr[0] = object.userID;
            filterArr[1] = object.firstName + " " + object.lastName;


            filteredArr.push(filterArr);
        })

        console.log(filteredArr.sort());
        for(var i=0; i< filteredArr.sort().length;i++)
        {

            jQuery('<option/>', {
                value: filteredArr[i][1],
                html: filteredArr[i][1]
            }).appendTo('#employeeSelect');
        }




    }, 'json')



}


function charts5(){
    var userNameElement = document.getElementById("employeeSelect");
    var userName = userNameElement.options[userNameElement.selectedIndex].text;
    console.log(userName);

    console.log(filteredArr);
    $.get('scripts/getTickets.php', {sort: 'ticketNumber'}, function (result) {

           console.log(result);

            var i =0;
            var userIDArray = [];
            filteredArr.forEach(arrID);
           function arrID(){
               if(filteredArr[i][1]=== userName){
                   userIDArray.push(filteredArr[i][0]);
               }
               i++;

           }

           console.log(userIDArray);




           }
        , 'json')

        /*var filteredArr = [];

        result.forEach(function(object){
            var filterArr = new Array();
            filterArr[0] = object.userID;
            filterArr[1] = object.firstName + " " + object.lastName;


            filteredArr.push(filterArr);
        })

        console.log(filteredArr.sort());*/






}
