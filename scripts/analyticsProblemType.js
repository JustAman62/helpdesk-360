var problemArr = new Array();
function charts3() {
    //console.log('1');

        $.get('scripts/getProblemTypes.php', function (result) {
            console.log(result);
            $.get('scripts/getProblemTypeID.php', function (result2) {
                console.log(result2);

                problemArr = result2.reduce(function (arr, v, i) {
                    return arr.concat(v, result[i]);
                }, []);
                console.log(problemArr);
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
                    console.log(counts);

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
                    console.log(filteredArr);
                    //console.log(problemArr);
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



    document.getElementById('selectbox').style.display = "none";
    document.getElementById('Avg').style.display = "block";

}

function charts6()
{
    $.get('scripts/getTickets.php', {sort: 'ticketNumber'}, function (result) {
        $.get('scripts/getProblemTypes.php', function (result2) {
            var filteredArray = [];
            //console.log(result);
            result.forEach(function(object){
                if(object.dateClosed !== null) {
                    var filterArr = new Array();
                    filterArr[0] = object.problemTypeID;
                    filterArr[1] = object.dateClosed;
                    filterArr[2] = object.dateCreated;


                    filteredArray.push(filterArr);
                }
            })
            console.log(filteredArray);
        console.log(problemArr);

            var finalArray = [];
            for (k = 0; k < problemArr.length - 1; k = k + 2) {
                for (j = 0; j < filteredArray.length; j++) {
                    if (filteredArray[j][0] === problemArr[k]) {
                        finalArray.push(problemArr[k + 1])
                    }
                }
            }
            //console.log(finalArr);
            console.log(finalArray);

            var filteredArrays = [];
            for (i = 0; i < filteredArray.length; i++) {
                var splitArray = new Array();
                splitArray[0] = filteredArray[i][1].split("-");
                splitArray[1] = filteredArray[i][2].split("-");
                filteredArrays.push(splitArray);
            }
            console.log(filteredArrays);

            var oneDay = 24 * 60 * 60 * 1000;
            var finalDays = [];
            for (f = 0; f < filteredArrays.length - 1; f ++) {


                var firstDate = new Date(filteredArrays[f][1][0], filteredArrays[f][1][1], filteredArrays[f][1][2]);
                var secondDate = new Date(filteredArrays[f][0][0], filteredArrays[f][0][1], filteredArrays[f][0][2]);
                var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                finalDays.push(diffDays);
                console.log(finalDays);
            }
            var finalArray2 = [];

            for(a=0; a<finalArray.length-1; a++){
                var tempArr = new Array();
                tempArr[0] = finalArray[a];
                tempArr[1] = finalDays[a];

                finalArray2.push(tempArr);
            }
            console.log(finalArray2);
                var count=0;
                var finalArray3 = [];
                var tempArray3 = [];
                var tempArray4 = [];
                for(b=0; b<finalArray2.length-1; b++){
                    if (finalArray2[b][0] === finalArray2[b + 1][0]) {
                        alert(finalArray2[b][0]);
                        alert(finalArray2[b+1][0]);
                        alert(tempArray3.length);
                        for(c=b+1; c<finalArray2.length; c++) {
                            alert(finalArray2[c][0]);

                            //alert(finalArray2[b][0]);
                        //alert(finalArray2[c][0]);

                        if (finalArray2[b][0] === finalArray2[c][0]) {

                                if (tempArray3.length === 0) {

                                    finalArray3[count] = finalArray2[c][0];
                                    tempArray3[0] = finalArray3[count];

                                    tempArray3[tempArray3.length] = finalArray2[c-1][1];

                                    tempArray3[tempArray3.length] = finalArray2[c][1];
                                    if(c===finalArray2.length-1){
                                        tempArray4[count]=tempArray3;

                                    }

                                    //for (c=b+1; c<finalArray2.length-1; c++) {
                                    //  if(finalArray2[b][0] === finalArray2[c][0]){
                                    // tempArray3[tempArray3.length] = finalArray2[c][1];
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
                    console.log(finalArray3);
            console.log(tempArray4);
                console.log(finalArray2.length);



            }
        , 'json')
        }
        , 'json')
}

