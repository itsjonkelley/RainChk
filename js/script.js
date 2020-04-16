//Project 1 for Group 2 GT Full Stack Dev Flex 2020
console.log("found js file!!");
var imBoredObj; //global variable to pass between functions-DW
//todoInput variable for textarea input
var todoInput;

//URL variable for OpenWeatherAPI
var queryURLforecast;

//getCity variable for City input on Weather page
var getCity = "Athens,us";

//var url = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={YOUR API KEY}
const openWeatherapi = {
    key: "appid=ab222fde8a40e718d2b8f92721309596", 
    base: "https://api.openweathermap.org/data/2.5/",
    units: "&units=imperial&",
    uvi: "uvi?"
}
//Example BoredAPI URL: "http://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=0.1"
const imBoredapi = {
     base: "http://www.boredapi.com/api/activity",
     participants: "participants=",
     minaccessibility: "minaccessibility=0",
     maxaccessibility: "maxaccessibility=0.1" 
    }
//check getCity input for empty string
function checkCity(getCity){
    console.log("in checkCity: ", getCity);
    if (!getCity) {//if emptystring display an alert
        $(".notification").removeClass("is-hidden"); //unhide alert
        $(".notification").text("No City Entered to Search.");
        $(".notification").append("<button class='delete' id='alertClose'></button>");
        $(document).on("click", "#alertClose", function() {
            $(".notification").addClass("is-hidden");
        });
        
    } 
    else {
        console.log("going to buildURL", getCity);
        // searchHistory.unshift(getCity);
        //$(".notification").hide();
        buildURL(getCity);
    }
}
    
function buildURL (getCity){
    if (!getCity){
        console.log("getCity emptystring", getCity);
        //queryURL = getLocation();
        //console.log("going to getLocation");
        // queryURL = getLocation(getCity);
        // <div class="notification is-warning">
        //     <button class="delete"></button>
        //     <strong>Did Not find the City you searched.</strong>
        //     Try City,St,US for an exact match.
        // </div>
    }
    else {
        queryURLforecast = openWeatherapi.base + "forecast?q=" + getCity + openWeatherapi.units + openWeatherapi.key;
        console.log("line 62 forecast URL:", queryURLforecast);
        queryURLcurrent = openWeatherapi.base + "weather?q=" + getCity + openWeatherapi.units + openWeatherapi.key;
    }
            //get the current weather
            $.ajax({
                url: queryURLcurrent,
                method: "GET" 
                })
                    .then(function (response) {
                        console.log("URL Sent: ", queryURLcurrent);
                        console.log("response: ", response);
                        console.log("Line 73 response.name: ", response.name);
                        var currentLat = response.coord.lat;
                        var currentLon = response.coord.lon;
                        console.log("Line 76 Current Lat & Long: ", response.coord.lat, ",",response.coord.lon);
                        getCity = response.name;
                        var currentCoord = {"lat" : currentLat, "lon" : currentLon};
                        var currrentIcon = response.weather[0].icon;
                        $("#searchCity").html("<strong>" + response.name + "</strong>");
                        //$("#search-city-temp").html("<h4 class='dark-text text-left' id='search-city-temp'>" + "Temprature: " + response.main.temp + "°F</h4>");
                        //$("#search-city-humidity").html("<h4 class='dark-text text-left' id='search-city-humidity'>Humidity: " + response.main.humidity + "%</h4>");
                        //$("#search-city-wind").html("<h4 class='dark-text text-left' id='search-city-wind'>" + "Wind Speed: " + response.wind.speed + "MPH</h4>");
                        console.log("currentLat: ", currentLat, "currentLon: ",currentLon);
                        //uvIndex(currentLat, currentLon);
                        //var cityListGroup = $("<ul class='list-group'>");
                        //var cityListGroupItem = $("<li class='list-group-item'>");
                        //var cityName = response.name;
                        var iconCode = response.weather[0].icon;
                        console.log(" Line 90 current: ", iconCode);
                        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
                        console.log("line 92 current weatherIconURL: ", iconUrl);
                        $("#weatherIcon").append("<img src='" + iconUrl + "'>");
                        $("#search-city-temp").html("<strong>" + response.main.temp + "°F</strong>");
                        //add to searched list
                        //var found = searchHistory.find(city => city === getCity)
                        // if(!found){
                        //     searchHistory.push(getCity)
                        //     localStorage.setItem("city", JSON.stringify(searchHistory));
                        //     renderBtns(getCity);
                        // }
                        forecastAPI();
                    })
                    .catch(function (error) {
                        console.log("Unable to reach OpenWeatherAPI:", error);
                        $(".notification").html("No City found matching your Search.<br> Try City,St,US for an exact match.");
                        $(".notification").append("<button class='delete' id='alertClose'></button>");
                        $(".notification").removeClass("is-hidden");
                        $(document).on("click", "#alertClose", function() {
                            $(".notification").addClass("is-hidden");
                        });
                    });
}    

//OpenWeatherAPI Call
function forecastAPI(){
    $.ajax({
        url: queryURLforecast,
        method: "GET" 
        })
            .then(function (response) {
                console.log("URL Sent: ", queryURLforecast);
                console.log("forcast: ", response);
                console.log("temp5: ", response.list[4].main.temp_max);
                for(var i = 0; i < 5; i++) {
                    let myDay = moment().add((1 + i),'day').format('l');
                    let nextDay = "#day" + (i + 1);
                    console.log("line 127 In for loop :", nextDay, i);
                    $(nextDay).html(myDay);
                    let myIconCode = response.list[i].weather[0].icon;
                    myIconUrl = "https://openweathermap.org/img/w/" + myIconCode + ".png";
                    $(".forcastIcon").html("<img src=" + myIconUrl  + ">"); //need to match names up to Maria's cards
                    let myTemp = response.list[i].main.temp_max;
                    $(nextDay + "-temp").text("Temp: " + myTemp + "°F");//need to match names up to Maria's cards
                    let myHumidity = response.list[i].main.humidity;
                    $(nextDay + "-humd").text("Humidity: " + myHumidity + "%");//need to match names up to Maria's cards
                }
            })
            .catch(function (error) {
                console.log("OpenWeatherAPI error:", error);

            });
};
                
                
                


 //API call to BOREDAPI and Modal functionality
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
                    todoInput = imBoredObj.activity;
                    console.log("New variable todoInput", todoInput);
                    $("#todoInput").val(imBoredObj.activity);
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

//Captures click on "Weather" link
$("#weatherLink").on("click", function() {
    //$(".container").addClass(".is-hidden");
    getCity = $("#getCity").val();
    console.log("Got Input: ", getCity);
    //$(".city").html("<h1>" + getCity + " (" + currentDate + ") </h1");
    checkCity(getCity);
});

//City Weather Search button
$(document).on("click", "#locationInputBtn", function() {
    getCity = $("#getCity").val();
    checkCity(getCity); //calls checkCity function to check for valid search
})
            


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


    // Function to add task to input


    $(document).ready(function () {
        $('#subTask').on("click", function () {
          var task = $('#todoInput').val();
          var chooseWeather = $('.todoWeather').val();
          var taskDate= $('.todoDate').val();

          
        
          
          console.log(task, chooseWeather,taskDate)
        });
        //function append row based on what city was searched by user
        $("#subTask").on("click", function () {
          var listedCity = $('<li>').text('<button>' + city + ' <button>');
          $('.task').append(listedCity)
        }
        )
      
      }); 

     
      //Create Function to appened task