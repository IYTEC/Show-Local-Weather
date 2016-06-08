var country = state = city = latitude = longitude = ip = "";
var json_object;

$(document).ready(function(){
    
    /*************************************************
    // On document ready, get the Location of the user based of their ip address
    // then call get weather.
    *************************************************/
    
   $.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?').done(function(location){
       country = location.country_name;
       state = location.state;
       city = location.city;
       latitude = location.latitude;
       longitude = location.longitude;
       ip = location.IPv4;
       getWeather();
   });
});

function getWeather(){
    
    /********************************************************************
    // Get the weather report of the user current location using
    // country or latitude and longitude or state or city, as search query.
    *******************************************************************/
    
        var weather_by_country = "http://api.openweathermap.org/data/2.5/weather?q=" + country + "&appid=0e925c6393f9b14b6378683471b80a7d";
        var weather_by_lat = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon="+longitude+"&appid=0e925c6393f9b14b6378683471b80a7d";
        var weather_by_state = "http://api.openweathermap.org/data/2.5/weather?q=" + state + "&appid=0e925c6393f9b14b6378683471b80a7d";
        var weather_by_city = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0e925c6393f9b14b6378683471b80a7d";
    
    if(latitude !== "" && longitude !== ""){
        
        // Get the location by city name
        
        $.getJSON(weather_by_lat, function(json){
            var celcius = Math.floor(json.main.temp - 273.15);
            var fahrenheit = Math.floor((json.main.temp * (9/5)) - 459.69)
            json_object = json;
            $(".city").html(city);
            console.log(json);
            $(".country").html(country);   
            $(".temperature").html(celcius);   
            $(".cel_or_fah").html("<sup>O</sup>C");
            $(".icon").attr("src", "http://openweathermap.org/img/w/"+json.weather[0].icon+".png");   
            $(".w_description").html(json.weather[0].description); 
        });
    }else if(state !== ""){
        
        // Get the location by the state name
        
        $.getJSON(weather_by_state, function(json){
            var celcius = Math.floor(json.main.temp - 273.15);
            var fahrenheit = Math.floor((json.main.temp * (9/5)) - 459.69)
            json_object = json;
            $(".city").html(state);
            console.log(json);
            $(".country").html(country);   
            $(".temperature").html(celcius+"<sup>O</sup>");   
            $(".cel_or_fah").val();
            $(".icon").attr("src", "http://openweathermap.org/img/w/"+json.weather[0].icon+".png");   
            $(".w_description").html(json.weather[0].description); 
        })
    }else if(city !== ""){
        
        // Get the location by longitude and latitude
        
       $.getJSON(weather_by_city, function(json){
            var celcius = Math.floor(json.main.temp - 273.15);
            var fahrenheit = Math.floor((json.main.temp * (9/5)) - 459.69)
            json_object = json;
            $(".city").html(city);
            console.log(json);
            $(".country").html(country);   
            $(".temperature").html(celcius+"<sup>O</sup>");   
            $(".cel_or_fah").val();
            $(".icon").attr("src", "http://openweathermap.org/img/w/"+json.weather[0].icon+".png");   
            $(".w_description").html(json.weather[0].description); 
        });
    }else{
        
        // Get the location by country name
        
        $.getJSON(weather_by_country, function(json){
            var celcius = Math.floor(json.main.temp - 273.15);
            var fahrenheit = Math.floor((json.main.temp * (9/5)) - 459.69)
            json_object = json;
            $(".city").html(city);
            console.log(json);
            $(".country").html(country);   
            $(".temperature").html(celcius+"<sup>O</sup>");   
            $(".cel_or_fah").val();
            $(".icon").attr("src", "http://openweathermap.org/img/w/"+json.weather[0].icon+".png");   
            $(".w_description").html(json.weather[0].description); 
        });
    }
}
/*************************************************

// Convert Celcius to Fahrenheit or Fahrenheit to Celcius

*************************************************/

function cel_to_fah(){
    var celcius = Math.floor(json_object.main.temp - 273.15);
    var fahrenheit = Math.floor((json_object.main.temp * (9/5)) - 459.69);
    var temp = $(".temperature").html();
    if(temp == celcius){
        $(".temperature").html(fahrenheit);
        $(".cel_or_fah").html("<sup>O</sup>F");
    }else{
        $(".temperature").html(celcius);
        $(".cel_or_fah").html("<sup>O</sup>C");
    }
}
