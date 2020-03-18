class mainObject {
  constructor() {
    //All HTML Elements
    this.footerText = document.getElementById("footerText");
    this.headerText = document.getElementById("headerText");
    this.updateText = document.getElementById("updateText");
    this.bgImage = document.getElementById("bg-image");
    this.weatherDiv = document.getElementById("weatherDiv");
    //Variables for user's coordinates
    this.lat = 0;
    this.long = 0;

    //Decides weather
    this.verbose = false;

    //Variables used later
    this.updateTime;
    this.weatherCondition;
    this.weatherData;
    this.weatherString;
    this.temperatureC;
    this.temperatureF;
    this.location;
    this.outputString;
    this.imageUrl;
    this.choice;
    //APIS
    this.unSplash = new unSplashObject(this);
    this.openWeather;

    //Generates a random integer
    this.randomInt(this.unSplash.perPage);
    //console.log(this.choice);
    //CSS Controller
    this.cssControl = new cssControlObject(this);
  }

  //Gets the user's location
  getLocation() {
    //Used to pass values into sub functions.
    var thisInherit = this;

    //Called after the location is found
    function callback() {
      thisInherit.getWeather();
    }

    //Stores the user's location coordinates
    function storePosition(position) {
      thisInherit.lat = position.coords.latitude;
      thisInherit.long = position.coords.longitude;
      console.log(position.coords.longitude);
      callback();
    }

    //If succesful in getting location it is stored
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(storePosition);
    }
    //Otherwise the user is notified
    else {
      if (this.verbose) {
        console.log("Location request unsuccesful!");
      }
      this.footerText.innerHTML = "Could not get location!";
    }
  }

  //Uses OpenWeather API
  getWeather() {
    this.openWeather = new openWeatherObject(this);
    this.openWeather.requestData();
  }

  //Uses Unsplash API
  getBgImage() {
    var condition = this.weatherCondition;
    function createSearch() {
      var searchString;
      if (condition == "Rain") {
        searchString = "rain";
      } else if (condition == "Clear") {
        searchString = "clear sky";
      } else if (condition == "Clouds") {
        searchString = "cloudy sky";
      } else {
        searchString = mainWeather;
      }
      //"sunny sky"
      return searchString;
    }

    //Searches for an image based on the weather condition
    this.unSplash.requestData(createSearch());
  }

  //Used by Unsplash to choose a random photo
  randomInt(max) {
    //Random number between 0-10
    this.choice = Math.floor(Math.random() * max);
  }

  //Function used to get the current time
  getUpdateTime() {
    //Creates a new date object
    var date = new Date();

    //Used for switching between am and pm
    var ampm = "am";

    //Gets hours and converts back to 12 hour time
    var h = date.getHours();
    if (h > 12) {
      h -= 12;
      ampm = "pm";
    }

    //Gets minutes and  formats
    var m = date.getMinutes();
    if (m < 10) {
      m = "0" + m;
    }

    //Updates the time variable
    this.updateTime = h + ":" + m + ampm;
  }

  //Updates HTML information with weather data
  setHtml() {
    //Creates a string to be displayed based on weather conditions
    function createWeatherString(condition) {
      var weatherString;
      if (condition == "Rain") {
        weatherString = "It is raining";
      } else if (condition == "Clear") {
        weatherString = "Skies are clear";
      } else if (condition == "Clouds") {
        weatherString = "Skies are cloudy";
      } else {
        weatherString = condition;
      }
      return weatherString;
    }

    //Stores the  weather data retrieved
    this.weatherData = this.openWeather.data;

    //Stores the weather condition in a shorter variable
    this.weatherCondition = this.weatherData.weather[0].main;

    //Since the background image is based on the weather condition the function can now be called
    this.getBgImage();

    //Used for display
    this.weatherString = createWeatherString(this.weatherCondition);

    //Converts the temperature from Kelvin to Celsius and Farenheit
    this.temperatureC = this.weatherData.main.temp - 273.15;
    this.temperatureF = Math.round((this.temperatureC * 9) / 5 + 32);

    //Stores location in a shorter variable
    this.location = this.weatherData.name;

    //Creates a string to be used for the footer
    this.outputString = this.temperatureF + " °F <br>" + this.weatherString;

    //Updates HTML
    this.headerText.innerText = this.location;
    this.footerText.innerHTML = this.outputString;

    //Updates time information
    this.getUpdateTime();
    this.updateText.innerText = "Last update: " + this.updateTime;
  }

  //Sets the background image to the image provided by Unsplash
  setBgImage() {
    //Sets a base width of 1920 for images
    var vpWidth = 1920;
    var rawParams = "&w=" + vpWidth;
    //Changes width if client windows is larger than standard
    if (document.documentElement.clientWidth > 1920) {
      vpWidth = document.documentElement.clientWidth;
      //Addons to the Unsplash Raw URL
    }
    if (document.documentElement.clientHeight < 400) {
      vpwidth = 1000;
      rawParams = "&w=" + vpwidth;
    }

    //Forms the css image url and updates
    this.cssControl.updateImage(this.image, rawParams);
    this.cssControl.showAll();
    this.cssControl.triggerAll();
  }

  //Starts Javascript functionality
  run() {
    this.cssControl.hideAll();
    //Only this function is needed since everything relies on location!
    this.getLocation();
  }
}
