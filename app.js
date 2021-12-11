const express = require("express");
const https = require("https");
const { urlToHttpOptions } = require("url");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");
    
})

app.post("/", function(req, res) {
    console.log(req.body.cityName);
    const queryCity = req.body.cityName;
    const apiKey = "b987364439752e3912b39abe97e69b1d"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&units=imperial&appid=" + apiKey;
    console.log(url);
    
    https.get(url, function(response) {
    response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const weatherDesc = weatherData.weather[0].description;
        const city = weatherData.name;
        const tmp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const iconImgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        console.log(iconImgUrl);
        console.log(weatherDesc);
        console.log(tmp);
        res.writeHead(200 , {'Content-Type' : 'text/html'})
        res.write("<p>The current weather in " + city + " is " + weatherDesc + ". </p>");
        res.write("<p>The temperature is " + tmp + " degrees.</p>");
        res.write("<img src=" + iconImgUrl + " >");
        //res.render(__dirname + "index.html", { city: city, weatherDesc: weatherDesc, tmp: tmp});  
        res.send();
    })
});
})

app.listen(3000, function() {
    console.log("Server running on port 3000");
})


