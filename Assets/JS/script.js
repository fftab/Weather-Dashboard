    // jQuery
$(document).ready(function() {

    // Storing Input Field Value
    let cityInput = "";

    // Event Listener for Search Button Click, Perform Function
    $("#search-button").on("click", function() {

        //
        cityInput = $("#city-input").val();

        // Call Search Function (cityInput)
        weatherSearch(cityInput);

        // Clearing Input Field Value
        $("#city-input").val("");

    });

    // Setting a Variable for the API Key
    let apiKey = "add15ec289ce19d31c31427412e25484";

    // Declaring the Weather Search Function, Passing in cityInput
    function weatherSearch(cityInput) {

        // Query URL url + cityInput + api key + Imperial (U.S.) Units
        let queryURL = ("https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey + "&units=imperial");

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

                // Call Function to Populate Button Row
                popButtons();

            }

            function popButtons() {

                for ( let i = 0; i < history.length; i++) {

                    
                    console.log(history);

                    console.log(history[i]);

                    // Setting Variable to New HTML Button 
                    let cityButton = $("<button>");

                    // Setting Class to New HTML Button
                    cityButton.addClass("btn btn-primary text-white");

                    cityButton.text(history[i]);

                    cityButton.attr("data-city", history[i]);

                    // Appending City Buttons to City Weather Button Div
                    $("#city-weather-buttons").append(cityButton);

                    

                }

            }

            // Setting Variable for Latitude from Response
            let lat = response.coord.lat;

            // Setting Variable for Longitude from Response
            let lon = response.coord.lon;

            // Setting Variable for Forecast URL
            let forecastURL = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial");

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

                // USing Console to Test Response
                console.log(response);

                // Clearing the HTML Before Appending
                $("#forecast-container").html("");

                // Loop through Forecast Objects Starting at index of 1 (if Today is Index 0, Tomorrow is Index 1)
                for (let i = 1; i < 6; i++) {

                    // Setting Variable to New Card Deck Div
                    let forecastCardDeck = $("<div>").addClass("card-deck");

                    // Setting Variable to New Card Div with Height Class
                    let forecastCard = $("<div>").addClass("card h-100 bg-primary text-white mr-4");

                    // Setting Variable to New Image with Source and Alt Attributes and Bootstrap Class of Card Image
                    let forecastImage = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png").addClass("card-img-top");

                    // *** Conditional for Image Alt Value
                    // if (forecastImage.attr("src") === "https://openweathermap.org/img/w/10d.png") {

                    //     // 
                    //     forecastImage.attr("alt", "Partly Sunny with a Chance of Showers");

                    // }

                    // Setting Image Height and Width
                    forecastImage.css("height", "150px");
                    forecastImage.css("width", "150px");

                    // Setting Variable to New Card Body Div
                    let forecastCardBody = $("<div>").addClass("card-body");

                    // Setting Variable to New Card Title
                    let forecastCardTitle = $("<h5>").addClass("card-title");

                    // Setting Forecast Card Date in Title Text
                    // forecastCardTitle.text("");

                    // New Paragraph for Forecast Card Wind Speed
                    let forecastWind = $("<p>").addClass("card-text").text("Wind Speed: " + response.daily[i].wind_speed + " MPH");

                    // New Paragraph for Forecast Card Humidity
                    let forecastHumidity = $("<p>").addClass("card-text").text("Humidity: " + response.daily[i].humidity + "%");

                    // New Paragraph for Forecast Card Temperature
                    let forecastTemperature = $("<p>").addClass("card-text").text("Temperature: " + response.daily[i].temp.day + "°");

                    // Appending Forecast Details to Forecast Card Body
                    forecastCardBody.append(forecastWind, forecastHumidity, forecastTemperature);

                    // Appending Image, Title and Body to Forecast Card
                    forecastCard.append(forecastImage, forecastCardTitle, forecastCardBody);

                    // Appending Forecast Card to Forecast Card Deck
                    forecastCardDeck.append(forecastCard);

                    // Appending Forecast Card Deck to Forecast Container Div
                    $("#forecast-container").append(forecastCardDeck);
                    
                }

            });

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

            // Call UV Index Function


        });

        

        // UV Index Function
        // function uvIndex() {

        //     if ()

        // }

    }

    // Setting Variable to Local Storage History 
    let history = JSON.parse(window.localStorage.getItem("history")) || [];

    // if statement () to check if history is greater than zero
        // if true weatherSearch(history[history.length-1]); // like break case in for loop
    
    // for loop run through history arraty to populate city buttons
    

});

// $.getJSON({}) to force grabbing JSON object