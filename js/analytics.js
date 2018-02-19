//Created by: Daniel Namyslaw
//Contributions by: Whole group.
//This function calculates the amount of closed tickets with low, medium and high priority and displays a pie chart.
var Priority0; //Creates 3 global variables
var Priority1;
var Priority2;
function charts() {



        $.get('scripts/getTickets.php', {sort: 'ticketNumber'}, function (result) { //Retrieves information from the database using php.
                                                                                    // It returns an array of all the information
                                                                                    //about open/closed tickets.

            //Getting Priority

            var result1 = result.map(a => a.priority); //Filters through the result array, and maps the object values of priority into an array.

            var p0 = [];
            var p1 = [];
            var p2 = [];

            function splitPriority(value) { //Filters through the array of priority information and
                                            // splits them into 3 arrays, one for; low, medium and high priority.
                if (value == 0) {
                    p0.push(value);
                }
                if (value == 1) {
                    p1.push(value);
                }
                if (value == 2) {
                    p2.push(value);
                }
            }

            result1.forEach(splitPriority);

            //These 3 lines calculate the length of each of the arrays,
            // so we know how many tickets we have for each priority and store it in a variable.
            Priority0 = p0.length;
            Priority1 = p1.length;
            Priority2 = p2.length;

            //PRIORITY GAUGE CHART
            new Chartist.Pie('.ct-chart', { //Creates a gauge chart for the data
                labels: ['Low Priority', 'Medium Priority', 'High Priority'], //sets the priorities as the labels
                series: [Priority0, Priority1, Priority2] //sets the info from the variables containing array length info as the values.
            }, {
                donut: true, //sets the design of the chart, where it starts, width, starting angle of the gauge chart etc.
                donutWidth: 60,
                donutSolid: true,
                startAngle: 270,
                total: (Priority0 + Priority1 + Priority2) * 2,
                showLabel: true
            });




        }, 'json')
    document.getElementById('selectbox').style.display = "none"; //sets the display of the select box as invisible
    document.getElementById('Avg').style.display = "none"; //sets the display of the checkbox as invisible.
    }



