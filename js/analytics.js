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
        //var length = bothDates.length;
        var filteredDates = [];
        var unwantedDates = [];
        var i =0;
        function newDateArray(value) {


            if(value !== null){
                if(bothDates[i+1] === null) {
                    unwantedDates.push(value);
                }
                else{
                    filteredDates.push(value);
                }
            }
            i++;
        }
        bothDates.forEach(newDateArray);
        var y = 0;
        var z = 1;
        var splitArray = [];
        for(i=0; i<filteredDates.length, z<filteredDates.length, y<filteredDates.length; i++) {

            splitArray.push(filteredDates[y].split("-"));
            splitArray.push(filteredDates[z].split("-"));
            y += 2;
            z += 2;
            console.log(y);
            console.log(z);
            console.log(filteredDates.length);

        }
        console.log(splitArray);
        var oneDay = 24*60*60*1000;
        var finalDays = [];
        for(f=0; f<splitArray.length-1; f+=2){


            var firstDate = new Date(splitArray[f+1][0], splitArray[f+1][1], splitArray[f+1][2]);
            var secondDate = new Date (splitArray[f][0], splitArray[f][1], splitArray[f][2]);
            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
            finalDays.push(diffDays);

        }
        console.log(finalDays);
        console.log(Math.max.apply(Math, finalDays));



    }, 'json')




}


