//Created by: Daniel Namyslaw.
//Contributions by: Whole group.
// This function generates a graph of days taken to close the tickets, in general, over the whole set of specialists.
function charts2() {

        $.get('scripts/getTickets.php', {sort: 'ticketNumber'}, function (result) { //gets the array of values from the database via PHP and displays it in an array.


                var result1 = result.map(b => b.dateCreated); //Takes the result array and copies the objects with the name dateCreated to result1 array.

                var result2 = result.map(c => c.dateClosed); //Takes the result array and copies the objects with the name dateClosed to result2 array.


                var bothDates = result1.reduce(function (arr, v, i) { //This creates a new array of an array of result1 and result2 concatenated.
                                                                        //with each array in the array having a date when its created and when its closed.
                    return arr.concat(v, result2[i]);
                }, []);


                var filteredDates = [];
                var unwantedDates = [];
                var i = 0;

                function newDateArray(value) {


                    if (value !== null) {               //This filters all of the array and checks if the date closed is null
                                                        //if it is it doesn't include it in the array. Meaning we are left with
                                                        //only the dates of the closed tickets
                        if (bothDates[i + 1] === null) {
                            unwantedDates.push(value);
                        }
                        else {
                            filteredDates.push(value);
                        }
                    }
                    i++;
                }

                bothDates.forEach(newDateArray);
                var y = 0;
                var z = 1;
                var splitArray = [];
                for (i = 0; i < filteredDates.length, z < filteredDates.length, y < filteredDates.length; i++) {    //filters through the array and splits the dates.

                    splitArray.push(filteredDates[y].split("-"));
                    splitArray.push(filteredDates[z].split("-"));
                    y += 2;
                    z += 2;


                }

                var oneDay = 24 * 60 * 60 * 1000; //finds one day in milliseconds
                var finalDays = [];
                for (f = 0; f < splitArray.length - 1; f += 2) {


                    var firstDate = new Date(splitArray[f + 1][0], splitArray[f + 1][1], splitArray[f + 1][2]); //sets the closed date

                    var secondDate = new Date(splitArray[f][0], splitArray[f][1], splitArray[f][2]); //sets the open date
                    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))); //calculates the difference between them in days.
                    finalDays.push(diffDays);

                }

                var counts = [];
                finalDays.forEach(function (x) { //counts the amount of days taken to close for each amount (0 days, 1 day etc.)
                    counts[x] = (counts[x] || 0) + 1;
                });
                //console.log(counts);

                var uniqArr = Array.from(new Set(finalDays)) //creates a unique array of those dates with no repetitions and turns it into a string

                uniqArr.sort().map(String);
                console.log(uniqArr.sort().map(String));

                var data = {
                    labels: uniqArr.sort().map(String), //uses the unique array to generate labels
                    series: [counts] //uses the array with the counted number of days as the values.
                };

                var options = {
                    seriesBarDistance: 5 //sets distance between bar.
                };

                var responsiveOptions = [
                    ['screen and (max-width: 640px)', { //sets responsiveness on small screens.
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function (value) {
                                return value[0];
                            }
                        }
                    }]
                ];

                new Chartist.Bar('.ct-chart', data, options, responsiveOptions); //creates a new bar chart in the div box. graphframe, on analytics page.

            }
            , 'json')

    document.getElementById('selectbox').style.display = "block"; //sets the select box to show
    document.getElementById('Avg').style.display = "none"; //sets the average days per problem type check box property to invisible.
}

