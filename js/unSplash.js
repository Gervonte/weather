class unSplashObject {
  constructor(main) {
    //Gives access to other functions used in main
    this.mainObject = main;

    //Variables that are used later
    this.data;
    this.apiRequest;

    //Decides if the request result is logged
    this.verbose = this.mainObject.verbose;

    //Key provided by Unsplash
    this.accessKey = //Removed for Github
      //Amount of images to return
      this.perPage = 30;

    //Partial Url to be added on to after getting weather
    this.URL =
      "https://api.unsplash.com/search/photos/?per_page=" +
      this.perPage +
      "&order_by=popular&query=";
  }

  //Requests data from the Unsplash API using the provided search term
  requestData(searchTerm) {
    //Adds the search term to complete the URL
    this.URL += searchTerm;

    //Forms a new request.
    this.apiRequest = new XMLHttpRequest();

    //Used to pass values into sub functions.
    var thisInherit = this;

    //Opens request to the UnSplash API
    this.apiRequest.open("GET", this.URL);

    //Sends authorization header to the API to get access
    this.apiRequest.setRequestHeader(
      "Authorization",
      "Client-ID " + this.accessKey
    );

    //This function is called after receiving the photo data.
    function callback() {
      // Partially Sets the image used in the main object, leaving out the width parameter
      if (thisInherit.verbose) {
        console.log("Choosing image number: " + thisInherit.mainObject.choice);
      }
      console.log(thisInherit.data);
      thisInherit.mainObject.image =
        thisInherit.data.results[thisInherit.mainObject.choice].urls.raw;
      thisInherit.mainObject.setBgImage();
    }

    //After the API respond
    this.apiRequest.onload = function() {
      //Parses the data from the API from JSON to a Javascript object
      thisInherit.data = JSON.parse(this.response);

      //Checks if the server responds with a succesful message
      if (
        thisInherit.apiRequest.status >= 200 &&
        thisInherit.apiRequest.status < 400
      ) {
        if (thisInherit.verbose) {
          console.log("Unsplash API Request succesful!");
        }
        callback();
      } else {
        if (thisInherit.verbose) {
          console.log("Unsplash API Request unsuccesful!");
        }
      }
    };
    //Sends the request to the server
    this.apiRequest.send();
  }
}
