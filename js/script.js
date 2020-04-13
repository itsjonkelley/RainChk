//Project 1 for Group 2 GT Full Stack Dev Flex 2020
console.log("found js file!!");
var imBoredObj;
//var url = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={YOUR API KEY}
const openWeatherapi = {
    key: "appid=ab222fde8a40e718d2b8f92721309596", 
    base: "https://api.openweathermap.org/data/2.5/",
    units: "&units=imperial&",
};
//Example BoredAPI URL: "http://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=0.1"
 const imBoredapi = {
     base: "http://www.boredapi.com/api/activity",
     participants: "participants=",
     minaccessibility: "minaccessibility=0",
     maxaccessibility: "maxaccessibility=0.1" 
 }

function imBored() {
    let queryURL = imBoredapi.base;
    $.ajax({
        url: queryURL,
        method: "GET" 
        })
            .then(function (response) {
                console.log("URL Sent: ", queryURL);
                console.log("response: ", response);
                let modalMessage = ("Activity Type: " + response.type + "<br>" + "Activity: " + response.activity + "<br>" + "# of Participants: " + response.participants);
                $(".modal-card-body").html(modalMessage);
                    
                //captures click on "Cancel" button to close modal for "I'm Bored!" link
                $(document).on("click", "#cancel-btn", function() {
                    $(".modal").removeClass("is-active");
                });
                //captures click to close modal for "I'm Bored!" link
                $("#modal-close").click(function() {
                    $(".modal").removeClass("is-active");
                });
                //captures click to save activity to ToDo list.
                $(document).on("click", "#save-imbored", function() {
                    console.log("Save button clicked", response.type);
                    //saved I'mBored API response to "imBoredObj" to be passed to ToDo list
                    imBoredObj = response;
                    console.log("Activity: ", imBoredObj.activity);
                    $(".modal").removeClass("is-active");
                });
            });
    }
//Captures Click to Next button in I'm Bored Modal            
$(document).on("click", "#next-imbored", function() {
    console.log("next button clicked");
    //Next I'mBored API to be cycled to the next activity
    imBored();
});           
//click funtion to capture click on "I'm Bored!" link             
$("#imbored-modal").on("click", function() {
    $(".modal").addClass("is-active");
    imBored(); 
});

            
            


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
