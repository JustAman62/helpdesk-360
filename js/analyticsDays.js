function charts2() {
    //console.log('3');
    if(document.getElementById('Time').checked) {
        $.get('scripts/getTickets.php', {sort: 'ticketNumber'}, function (result) {
                //console.log('4');
                //Getting Priority
                //console.log(result);
                var result1 = result.map(b => b.dateCreated);
                //console.log(result1);
                var result2 = result.map(c => c.dateClosed);
                //console.log(result2);

                var bothDates = result1.reduce(function (arr, v, i) {
                    return arr.concat(v, result2[i]);
                }, []);

                //console.log(bothDates);
                //var length = bothDates.length;
                var filteredDates = [];
                var unwantedDates = [];
                var i = 0;

                function newDateArray(value) {


                    if (value !== null) {
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
                for (i = 0; i < filteredDates.length, z < filteredDates.length, y < filteredDates.length; i++) {

                    splitArray.push(filteredDates[y].split("-"));
                    splitArray.push(filteredDates[z].split("-"));
                    y += 2;
                    z += 2;
                    //console.log(y);
                    //console.log(z);
                    //console.log(filteredDates.length);

                }
                //console.log(splitArray);
                var oneDay = 24 * 60 * 60 * 1000;
                var finalDays = [];
                for (f = 0; f < splitArray.length - 1; f += 2) {


                    var firstDate = new Date(splitArray[f + 1][0], splitArray[f + 1][1], splitArray[f + 1][2]);
                    var secondDate = new Date(splitArray[f][0], splitArray[f][1], splitArray[f][2]);
                    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                    finalDays.push(diffDays);

                }
                //console.log(finalDays.sort());
                //console.log(Math.max.apply(Math, finalDays));

                var counts = [];
                finalDays.forEach(function (x) {
                    counts[x] = (counts[x] || 0) + 1;
                });
                //console.log(counts);

                var uniqArr = Array.from(new Set(finalDays))


                //console.log(uniqArr);

                var data = {
                    labels: uniqArr.sort(),
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
    else{
        document.getElementById('graphFrame').innerHTML = "";
    }





}
