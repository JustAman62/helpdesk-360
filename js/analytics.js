/*$(function() {
    charts();
    console.log('hey');
});*/

var Priority0;
var Priority1;
var Priority2;
function charts() {

    $.get('scripts/getTickets.php', function(result){
        //Getting Priority
        console.log(result);
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
function charts2() {

    $.get('scripts/getTickets.php', function(result){
        //Getting Priority
        //console.log(result);
        var result1 = result.map(b => b.dateCreated);
        console.log(result1);
        var result2 = result.map(c => c.dateClosed);
        console.log(result2);

        var bothDates = result1.reduce(function(arr, v, i) {
            return arr.concat(v, result2[i]);
        }, []);
        console.log(bothDates);

        var oneDay = 1000*60*60*24;

        for(i=0; i<bothDates.length; i+2){

                var date1 = bothDates[i];
                var date2 = bothDates[i + 1];
                var date1MS = date1.getTime();
                var date2MS = date2.getTime();
                var differenceMS = date2MS - date1MS;
        var resultDays = Math.round(differenceMS/oneDay);
        console.log(resultDays);

        }
        /*var p0 = [];
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
        result1.forEach(splitPriority);*/


    }, 'json')




}


