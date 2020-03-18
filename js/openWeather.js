class openWeatherObject {
  constructor(main) {
    //Gives access to other functions used in main
    this.mainObject = main;

    //Variables that are used later
    this.data;
    this.apiRequest;

    //Decides if the request result is logged
    this.verbose = this.mainObject.verbose;

    //Rounds both to two Decimals
    this.lat = Math.floor(this.mainObject.lat * 100) / 100;
    this.long = Math.floor(this.mainObject.long * 100) / 100;

    //Api Key provided by OpenWeather
    this.apiKey = //Remove for github
      //URL formed from latitude,longtitude and api key
      this.URL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        this.lat +
        "&lon=" +
        this.long +
        "&APPID=" +
        this.apiKey;
  }

  //Requests data from the OpenWeather API
  requestData() {
    //Forms a new request.
    this.apiRequest = new XMLHttpRequest();

    //Used to pass values into sub functions.
    var thisInherit = this;

    //Opens request to the OpenWeather API
    this.apiRequest.open("GET", this.URL);

    //This function is called after receiving the weather data.
    function callback() {
      //Sends data back to the main object
      thisInherit.mainObject.setHtml();
    }

    //After the API responds
    this.apiRequest.onload = function() {
      //Parses the data from the API from JSON to a Javascript object
      thisInherit.data = JSON.parse(this.response);

      //Checks if the server responds with a succesful message
      if (
        thisInherit.apiRequest.status >= 200 &&
        thisInherit.apiRequest.status < 400
      ) {
        if (thisInherit.verbose) {
          console.log("OpenWeather API Request succesful!");
        }
        callback();
      } else {
        if (thisInherit.verbose) {
          console.log("OpenWeather API Request unsuccesful!");
        }
      }
    };
    //Sends the request to the server
    this.apiRequest.send();
  }
}
