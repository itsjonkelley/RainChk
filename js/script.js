//Project 1 for Group 2 GT Full Stack Dev Flex 2020
console.log("found js file!!");
//var url = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={YOUR API KEY}
const openWeatherapi = {
    key: "ab222fde8a40e718d2b8f92721309596", 
    base: "https://api.openweathermap.org/data/2.5/"
}
 const imBoredapi = {
     base: "http://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=0.1"
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
                $(".modal-card-body").html("Activity Type: " + response.type + "<br>" + "Activity: " + response.activity);
                //$(".model-card-foot").append(<footer class="modal-card-foot"><button class="button modal-close">Cancel</button></footer>);
            
                $("#modal-close").click(function() {
                    $(".modal").removeClass("is-active");
                    
                });        
            });
            
        }
        
        
        
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
