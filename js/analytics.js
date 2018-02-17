/*$(function() {
    charts();
    console.log('hey');
});*/

var Priority0;
var Priority1;
var Priority2;
function charts() {
        //console.log('1');

        $.get('scripts/getTickets.php',{sort: 'ticketNumber'}, function(result){
        //console.log('2');
        //Getting Priority
        //console.log(result);
        var result1 = result.map(a => a.priority);
        //console.log(result1);
        var p0 = [];
        var p1 = [];
        var p2 = [];

        function splitPriority(value) {
            if(value == 0){
             p0.push(value);
            }
            if(value == 1){
                p1.push(value);
            }
            if(value == 2){
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
        var data = {
            labels: ['Low Priority', 'Medium Priority', 'High Priority'],
            series: [Priority0, Priority1, Priority2]
        };

        var options = {
            labelInterpolationFnc: function(value) {
                return value[0]
            }
        };

        var responsiveOptions = [
            ['screen and (min-width: 640px)', {
                chartPadding: 30,
                labelOffset: 100,
                labelDirection: 'explode',
                labelInterpolationFnc: function(value) {
                    return value;
                }
            }],
            ['screen and (min-width: 1024px)', {
                labelOffset: 80,
                chartPadding: 20
            }]
        ];

        new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
        }, 'json')

}



