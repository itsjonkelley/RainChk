//Project 1 for Group 2 GT Full Stack Dev Flex 2020
console.log("found js file!!");
// $( document ).ready(function() {
//     console.log( "ready!" );
// });


// var displayToday = moment().format('MMMM Do YYYY'); 
// var showDate = document.querySelector("#currentDay");
// showDate.innerHTML=displayToday;
// console.log(displayToday);

function displayDates () {
    (showDate.innerHTML=date)
};

for( let i = 0; i < 5; i++ ) {
    var date = moment().add(i,'days').format('MMMM Do'); 
    var showDate = document.querySelector(".day"+i);
    showDate.innerHTML=date;
    displayDates(showDate);
    console.log(i);
    };
