//Created by: Daniel Namyslaw
//Contributions by: Whole group.
//The first function takes the problem type and finds out how many instances of each one have happened in the closed tickets.
//The second function does a similar task but for every problem type finds out the average time taken to close in days.
var problemArr = new Array(); //Creates a global array to be used by both functions.
function charts3() {


        $.get('scripts/getProblemTypes.php', function (result) {  //This function takes values from the database using php.
                                                                    //Finding the problem type names.

            $.get('scripts/getProblemTypeID.php', function (result2) { //This functions does the same as above
                                                                        // but this time finds the ids of the problem type.


                problemArr = result2.reduce(function (arr, v, i) { //Concatenates the two arrays so that a problem type name is matched with its ID.
                    return arr.concat(v, result[i]);
                }, []);

                $.get('scripts/getTickets.php', {sort: 'ticketNumber'}, function (result3) { //Takes values from the database using php
                                                                                            // and find the ticket information.

                    var result4 = result3.map(a => a.problemTypeID); //Goes through the array of ticket info and takes the problem type ID from it.

                    var uniqArr = Array.from(new Set(result4)); //Creates an array of unique ID's from the ticket info

                    var counts = [];
                    result4.sort().forEach(function (x) { //Counts the amount of each problem type in the array of ID's.
                        counts[x] = (counts[x] || 0) + 1;
                    });


                    var filteredArr = [];
                    var unwantedVal = [];
                    var i = 0;

                    function newArray(value) {


                        if (value !== null) {  //Checks if any of the values are null if they are remove them.
                            if (result4[i] === null) {
                                unwantedVal.push(value);
                            }
                            else {
                                filteredArr.push(value);
                            }
                        }
                        i++;
                    }

                    counts.forEach(newArray);
                    var finalArr = [];
                    for (k = 0; k < problemArr.length - 1; k = k + 2) { //This for loop compares the array of concatenated problem type details
                                                                        //and the array of unique ID's. Then creates a new array of just the names of problem types.
                        for (j = 0; j < uniqArr.length; j++) {
                            if (uniqArr[j] === problemArr[k]) {
                                finalArr.push(problemArr[k + 1])
                            }
                        }
                    }

                    var data = { //creates a bar graph with the array of unique names as the labels,
                                // and the amount of each of the problem types in the ticket info as the values.
                        labels: finalArr,
                        series: [filteredArr]

                    };

                    var options = {
                        seriesBarDistance: 5 //sets distance between bars
                    };

                    var responsiveOptions = [
                        ['screen and (max-width: 640px)', { //sets responsiveness on small screens
                            seriesBarDistance: 5,
                            axisX: {
                                labelInterpolationFnc: function (value) {
                                    return value[0];
                                }
                            }
                        }]
                    ];

                    new Chartist.Bar('.ct-chart', data, options, responsiveOptions); //creates a new bar chart in the div, graph frame, on the analytics page.

                }, 'json')


            }, 'json')

        }, 'json')



    document.getElementById('selectbox').style.display = "none"; //Sets the property of the select box div to invisible
    document.getElementById('Avg').style.display = "block"; //sets the property of the average problem type checkbox div to visible.

}

function charts6()
{
    $.get('scripts/getTickets.php', {sort: 'ticketNumber'}, function (result) { //Connects to the database and retrieves ticket information.
        $.get('scripts/getProblemTypes.php', function (result2) { //connects to databae and retrieves problem info
            var filteredArray = [];
            result.forEach(function(object){ //filters through the result array and checks if the value isn't null and if it isn't,
                                            // takes the problem type ID, date Closed and Created and stores it in an array
                                            //and pushes that into a new array
                if(object.dateClosed !== null) {
                    var filterArr = new Array();
                    filterArr[0] = object.problemTypeID;
                    filterArr[1] = object.dateClosed;
                    filterArr[2] = object.dateCreated;


                    filteredArray.push(filterArr);
                }
            })

            var finalArray = [];
            for (k = 0; k < problemArr.length - 1; k = k + 2) { //takes the array of problem type names and id's.
                                                                //as well as the array of problem type id, date closed and created.
                                                                //matches the name of the problem to the date close and created.
                for (j = 0; j < filteredArray.length; j++) {
                    if (filteredArray[j][0] === problemArr[k]) {
                        finalArray.push(problemArr[k + 1])
                    }
                }
            }


            var filteredArrays = [];                            //Splits the date values into 'yyyy', 'mm', 'dd'
                                                                // and creates an array of arrays of those values.
            for (i = 0; i < filteredArray.length; i++) {
                var splitArray = new Array();
                splitArray[0] = filteredArray[i][1].split("-");
                splitArray[1] = filteredArray[i][2].split("-");
                filteredArrays.push(splitArray);
            }


            var oneDay = 24 * 60 * 60 * 1000; //calculates a day in milliseconds.
            var finalDays = [];
            for (f = 0; f < filteredArrays.length - 1; f ++) {


                var firstDate = new Date(filteredArrays[f][1][0], filteredArrays[f][1][1], filteredArrays[f][1][2]); //sets closed date
                var secondDate = new Date(filteredArrays[f][0][0], filteredArrays[f][0][1], filteredArrays[f][0][2]); //sets created date
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))); //finds difference between the two dates in days
                finalDays.push(diffDays);

            }
            var finalArray2 = [];
/*This next block of code takes the values of the difference in days for each problem type.
* Tests if it occurs just once in the array, if it does, it puts it into an array of values with problem type name with the name of the problem type and days taken to close
* If it doesn't occur just once, it tests if it occurs twice, if it does it puts that in the array with the name and two of the values
 * if it doesn't occur twice it moves onto the final one which is 3 or more times, it puts the name of the problem type and all the corresponding values in the array.*/
            for(a=0; a<finalArray.length-1; a++){
                var tempArr = new Array();
                tempArr[0] = finalArray[a];
                tempArr[1] = finalDays[a];

                finalArray2.push(tempArr);
            }

                var count=0;
                var finalArray3 = [];
                var tempArray3 = [];
                var tempArray4 = [];
                for(b=0; b<finalArray2.length-1; b++){
                    if (finalArray2[b][0] === finalArray2[b + 1][0]) {

                        for(c=b+1; c<finalArray2.length; c++) {



                        if (finalArray2[b][0] === finalArray2[c][0]) {

                                if (tempArray3.length === 0) {

                                    finalArray3[count] = finalArray2[c][0];
                                    tempArray3[0] = finalArray3[count];

                                    tempArray3[tempArray3.length] = finalArray2[c-1][1];

                                    tempArray3[tempArray3.length] = finalArray2[c][1];
                                    if(c===finalArray2.length-1){
                                        tempArray4[count]=tempArray3;

                                    }


                                }
                                else {
                                    tempArray3[0] = finalArray3[count];
                                    tempArray3[tempArray3.length - 1] = finalArray2[c-1][1];
                                    tempArray3[tempArray3.length] = finalArray2[c][1];

                                }

                        }
                        else{
                            b=c-1;
                            tempArray4[count]=tempArray3;
                            c=finalArray2.length;
                            tempArray3= new Array();
                            count=count+1;
                        }
                    }

                    }
                    else
                    {


                        finalArray3[count]=finalArray2[b][0];
                        tempArray3[0]=finalArray3[count];
                        tempArray3[tempArray3.length]=finalArray2[b][1];
                        tempArray4[count]=tempArray3;
                        count=count+1;

                        tempArray3=new Array();

                        }
                    }

            var arr2 = [];
            var arr3 =[];
            var ii = 0;
                for(i=0; i<tempArray4.length; i++){
                    var arr3 = new Array();
                    ii = 0;
                    for(m=0; m<tempArray4[i].length; m++){
                        if(tempArray4[i][m] >=0) {
                            arr3[ii] = tempArray4[i][m];
                            ii++
                        }
                    }


                    var total =0;
                    for(n=0; n<arr3.length; n++){ //Runs through the values for each problem type
                                                    // and sums them up and then
                                                    //divides that sum by the total amount of values.

                        total += arr3[n];
                    }
                    var average = total/arr3.length;
                    var arr3 = new Array();
                    arr3[0] = Math.round(average);

                    arr2.push(arr3); //Creates another array of those averages.
                }



                var arr4 = [].concat.apply([], arr2); //The array of averages is stored in an array of arrays,
                                                        // so this makes it just a basic array and can be used in the graph

                new Chartist.Line('.ct-chart', { //This creates a new line chart with filled area underneath it.
                    labels: finalArray3, //Uses the array of unique problem type names as labels.
                    series: [arr4] //uses the array of average days.
                }, {
                    low: 0,
                    showArea: true
                });
            }
        , 'json')
        }
        , 'json')
}

