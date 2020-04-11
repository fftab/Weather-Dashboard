$(document).ready(function() {

    // Event Listener for Search Button Click, Perform Function
    $("#search-button").on("click", function() {

        // Storing Input Field Value
        let cityInput = $("#city-input").val();

        // Clearing Input Field Value
        $("#city-input").val("");

        // Call Search Function (cityInput)
        weatherSearch(cityInput);

    });

    // Setting a Variable for the API Key
    let apiKey = "01b3cd1976a0c8efe2a1cf86798399b9";

    // Query URL url + cityInput + api key + Imperial (U.S.) Units
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey + "&units=imperial";

    // Declaring the Weather Search Function, Passing in cityInput
    function weatherSearch(cityInput) {

        // AJAX request
        $.ajax({
            
            // Query URL
            url: queryURL,

            // Get Reponse
            method: "GET",

            // Make sure to get only if JSON
            dataType: "json"

            // Then Pass Response into Function
        }).then(function(response) {

            // If City Input does not have an Index in History Array
            if (history.indexOf(cityInput) === -1) {

                // Push cityInput into History Array
                history.push(cityInput);

                // Set stringified History into Local Storage
                localStorage.setItem("history", JSON.stringify(history));

                // Setting Variable for Latitude from Response
                let lat = response.coord.lat.val();

                // Setting Variable for Longitude from Response
                let lon = response.coord.lon.val();

                // Setting Variable for Forecast URL
                let forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

                // Ajax Request for Five Day Forecast
                $.ajax({

                    // Query URL
                    url: forecastURL,

                    // Getting Response
                    method: "GET",

                    // Making sure to grab only if JSON
                    dataType: "json"

                // then Pass Response into Function
                }).then(function(response) {

                    console.log(response);

                    // Loop through Forecast Objects Starting at index of 1 (if Today is Index 0, Tomorrow is Index 1)
                    // for (let i = 1; i < 6; i++) {

                    //     // Create Cards for Each Forecast Index from 1 to 6


                    // }

                });


                // Call Function to Populate Button Row


            }

            // Testing Response
            console.log(response);

            // Emptying div
            $("#main-card").empty();

            // Creating a Card Body using Bootstrap Class
            let cardBody = $("<div>").addClass("card-body");

            // Creating a Card Header using Bootstrap Class and Current Date
            let title = $("<h3>").addClass("card-title").text(response.name + " (" + new Date().toLocaleDateString() + ") ");

            // Creating a Card using Bootstrap Class
            let card = $("<div>").addClass("card");

            // Creating a Paragraph with Text Populated from Response for Wind
            let wind = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");

            // Creating a Paragraph with Text Populated from Response for Humidity
            let humidity = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + "%");

            // Creating a Paragraph with Text Populated from Response for Temp
            let temperature = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp + "°");

            // Creating an Image and setting the Icon populated from Response
            let img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

            // Append the Image to the Title
            title.append(img);

            // Append the Title and Weather Data to the Card Body
            cardBody.append(title, temperature, humidity, wind);

            // Appending the Card Body to the Card
            card.append(cardBody);

            // Appending the Card to the Main Card in HTML
            $("#main-card").append(card);

            // Call 5 Day Forecast Function and UV Index Function


        });

    }

    // 
    let history = JSON.parse(window.localStorage.getItem("history")) || [];

    // if statement () to check if history is greater than zero
        // if true weatherSearch(history[history.length-1]); // like break case in for loop
    
    // for loop run through history arraty to populate city buttons
    

});