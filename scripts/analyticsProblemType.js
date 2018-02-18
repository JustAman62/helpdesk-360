function charts3() {
    //console.log('1');

        $.get('scripts/getProblemTypes.php', function (result) {
            //console.log(result);
            $.get('scripts/getProblemTypeID.php', function (result2) {
                //console.log(result2);

                var problemArr = result2.reduce(function (arr, v, i) {
                    return arr.concat(v, result[i]);
                }, []);
                //console.log(problemArr);
                $.get('scripts/getTickets.php', {sort: 'ticketNumber'}, function (result3) {
                    //console.log(result3);
                    var result4 = result3.map(a => a.problemTypeID);
                    //console.log(result4.sort());
                    var uniqArr = Array.from(new Set(result4));
                    //console.log(uniqArr);
                    var counts = [];
                    result4.sort().forEach(function (x) {
                        counts[x] = (counts[x] || 0) + 1;
                    });
                    //console.log(counts);

                    var filteredArr = [];
                    var unwantedVal = [];
                    var i = 0;

                    function newArray(value) {


                        if (value !== null) {
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
                    //console.log(filteredArr);
                    //console.log(problemArr.length);
                    //console.log(uniqArr.length);
                    var finalArr = [];
                    for (k = 0; k < problemArr.length - 1; k = k + 2) {
                        for (j = 0; j < uniqArr.length; j++) {
                            if (uniqArr[j] === problemArr[k]) {
                                finalArr.push(problemArr[k + 1])
                            }
                        }
                    }
                    //console.log(finalArr);
                    console.log(finalArr);
                    var data = {
                        labels: finalArr,
                        series: [filteredArr]

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

                }, 'json')


            }, 'json')

        }, 'json')





}

