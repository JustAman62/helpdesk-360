
$(function() {
    showTickets();
    resizeAllGridItems();

});

function resizeAllGridItems(){
    let allTickets = document.getElementsByClassName("ticket");
    for(x=0;x<allTickets.length;x++){
        resizeGridItem(allTickets[x]);
    }
}

function resizeGridItem(item){
    let ticketList = document.getElementById("ticket-list");
    let rowHeight = parseInt(window.getComputedStyle(ticketList).getPropertyValue('grid-auto-rows'));
    let rowGap = parseInt(window.getComputedStyle(ticketList).getPropertyValue('grid-row-gap'));
    let rowSpan = Math.ceil((item.querySelector('.ticket-body').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
}

function showTickets(){

    $.get('scripts/getTickets.php', function(result) {
        console.log(result);
        for (let i in result) {
            if (result[i].ticketStatus==0) createTicket(i, result);
        }
    }, 'json');
}


