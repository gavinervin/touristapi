//console.log("javascript file is working");

  var config = {
    apiKey: "AIzaSyCq8lAkEWhY5I87P0SZnQaZANDfwHLTC9I",
    authDomain: "my-awesome-project-acffe.firebaseapp.com",
    databaseURL: "https://my-awesome-project-acffe.firebaseio.com",
    projectId: "my-awesome-project-acffe",
    storageBucket: "my-awesome-project-acffe.appspot.com",
    messagingSenderId: "734020808506"
  };

    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();

    // Initializing our recent search count at 0
    var last10LocationSearches = [];

    // the below can toggle all the console.log messages and alerts used for testing purposes
    var debuggingMessagesTurnedOn = true;
    //var debuggingMessagesTurnedOn = false;


$("#submitCity").on("click", function() {
      	event.preventDefault();
      	var city = $("#cityName").val().trim();
      	// var zip = $("#zipCode").val().trim();
      	var search2Push;
      	if(debuggingMessagesTurnedOn){
          	console.log("City Submit button was clicked.");
          	console.log("City Name is : " + city);
          	// console.log("Zip Code is: " + zip);
      	}
 
          search2Push = city;

    // logic to limit to last ten searhes
          	if(debuggingMessagesTurnedOn){
          		console.log("last10LocationSearches.length = " + last10LocationSearches.length)
          	}

    if (last10LocationSearches.length<9){ // looks at array length before pushing
          	if(debuggingMessagesTurnedOn){
          		console.log("list < 10");
          	}
    	last10LocationSearches.push(search2Push);
	}else{// if already 10 items, pop oldest one off array
          	if(debuggingMessagesTurnedOn){
      			   console.log("list is over 10, popping oldest item")		
      		  }
    	last10LocationSearches.shift();
    	last10LocationSearches.push(search2Push);
	}


    database.ref().set({
        recentSearches: search2Push,
        locationArray: last10LocationSearches,
    });
    // if length > 10,  pop last one off when adding a new location

  });



var currentSearch = "No Searches have been done";

database.ref().on("value", function(snapshot) {


  if (snapshot.child("recentSearches").exists() && snapshot.child("locationArray").exists()) {
            	if(debuggingMessagesTurnedOn){
            		console.log("This is when there is search history to read.");
            	}
  	var display = snapshot.child("recentSearches").val();
  	var searchList = snapshot.child("locationArray").val();
            	if(debuggingMessagesTurnedOn){
            	  	console.log("Snapshot Array is: " + searchList);
            	}
  	$("#Weather").empty();
  	last10LocationSearches = [];
  	for (var i = 0; i<searchList.length;i++){
          	if(debuggingMessagesTurnedOn){
          	  console.log("Item# " + i + " has value of " + searchList[i]);
          	}
        	    last10LocationSearches.push(searchList[i]);
              var buttonList = $("<button>");
              buttonList.text(searchList[i]);
              buttonList.attr("location-to-search", searchList[i]);
              buttonList.attr("class", "btn btn-default search-button");
        //      buttonList.attr("class", "btn btn-default");
              //buttonList.attr("display", "block");
              // buttonList.attr("background-color", "#e7e7e7");
              // buttonList.attr("color", "black");
        //      $("#Weather").prepend("<p>" + buttonList + "<p>");   
              $("#Weather").prepend("<p>");   
              $("#Weather").prepend(buttonList);
  	}

          // console logging array to be sure what it looks like
        if(debuggingMessagesTurnedOn){
            console.log("Local array looks like this: " + last10LocationSearches);
          }
      }else{
              if(debuggingMessagesTurnedOn){
                  console.log("This is when there HAS NOT BEEN ANY search(firebase was reset, or zombie apocalypse has destroyed the data center)");
              }
              //display that are no recent searches
              $("#Weather").text(currentSearch);
      }

       // now make an on.clock event for the buttons to trigger a search
//      $(".btn-default").on("click", function() {
      $(".search-button").on("click", function() {
            		if(debuggingMessagesTurnedOn){
                  	console.log("a button was clicked, " + $(this).attr("location-to-search") + " is the value");
                  }


          var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 35.89989698213954, lng: -79.01249361429444},
            zoom: 19,
            mapTypeId: google.maps.MapTypeId.HYBRID
          });       
        var input = $(this).attr("location-to-search");
                  if(debuggingMessagesTurnedOn){
                      console.log('recent search button', input);
                  }
//        var searchBox = new google.maps.places.SearchBox(input);
        var searchBox = new google.maps.places.PlacesService(map);
//        var searchBox = new google.maps.places.querySelector(input);

          google.maps.event.addListenerOnce(map, 'idle', function(){  
              var request = {
          //        query: 'Orlando'
                  query: input
              };

              searchBox.textSearch(request, callback);

              function callback(results, status) {
                  if (status == google.maps.places.PlacesServiceStatus.OK) {
                      //grab the first item, Orlando, Florida, USA
                      var place = results[0];
                      input.value = place.formatted_address; 
                      map.setCenter(place.geometry.location);
                  }
              }
          });   // closes           google.maps.event.addListenerOnce(map, 'idle', function(){      
    });      // closes       $(".search-button").on("click", function() { 
});    // closes "database.ref().on("value", function(snapshot) {"   




