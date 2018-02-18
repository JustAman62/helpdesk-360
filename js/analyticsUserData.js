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
            var userArr = [];
            result.forEach(function(object){

                if(object.userID == userIDArray) {
                    if(object.dateClosed !== null) {
                        var filterArr = new Array();
                        filterArr[0] = object.dateCreated;
                        filterArr[1] = object.dateClosed;
                    }
                }
                if(filterArr === undefined){
                    return
                }

                userArr.push(filterArr);
            })


        console.log(userArr);

            var filteredArrs = [];
            for (i = 0; i < userArr.length; i++) {
                var splitArray = new Array();
                splitArray[0] = userArr[i][0].split("-");
                splitArray[1] = userArr[i][1].split("-");
                filteredArrs.push(splitArray);
            }
            console.log(filteredArrs);
            var oneDay = 24 * 60 * 60 * 1000;
            var finalDays = [];
            for (f = 0; f < filteredArrs.length - 1; f ++) {


                var firstDate = new Date(filteredArrs[f][1][0], filteredArrs[f][1][1], filteredArrs[f][1][2]);
                var secondDate = new Date(filteredArrs[f][0][0], filteredArrs[f][0][1], filteredArrs[f][0][2]);
                console.log(secondDate);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                finalDays.push(diffDays);
                console.log(diffDays);
            }
            console.log(finalDays.sort());
            //console.log(Math.max.apply(Math, finalDays));

            var counts = [];
            finalDays.forEach(function (x) {
                counts[x] = (counts[x] || 0) + 1;
            });
            console.log(counts);

            var uniqArr = Array.from(new Set(finalDays))
            console.log(uniqArr);
            uniqArr.sort().map(String);
            console.log(uniqArr.sort().map(String));

            var data = {
                labels: uniqArr.sort().map(String),
                series: [counts]
            };

            var options = {
                seriesBarDistance: 5
            };

            var responsiveOptions = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
            ];

            new Chartist.Bar('.ct-chart', data, options, responsiveOptions);

        }
        , 'json')








}
