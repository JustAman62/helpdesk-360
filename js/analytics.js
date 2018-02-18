/*$(function() {
    charts();
    console.log('hey');
});*/

var Priority0;
var Priority1;
var Priority2;
function charts() {



        $.get('scripts/getTickets.php', {sort: 'ticketNumber'}, function (result) {

            //Getting Priority

            var result1 = result.map(a => a.priority);

            var p0 = [];
            var p1 = [];
            var p2 = [];

            function splitPriority(value) {
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
            //console.log(p0);
            //console.log(p1);
            //console.log(p2);

            Priority0 = p0.length;
            Priority1 = p1.length;
            Priority2 = p2.length;

            //PRIORITY PIE CHART
            new Chartist.Pie('.ct-chart', {
                labels: ['Low Priority', 'Medium Priority', 'High Priority'],
                series: [Priority0, Priority1, Priority2]
            }, {
                donut: true,
                donutWidth: 60,
                donutSolid: true,
                startAngle: 270,
                total: (Priority0 + Priority1 + Priority2) * 2,
                showLabel: true
            });




        }, 'json')

    }



