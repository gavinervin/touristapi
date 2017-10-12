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


$("#submitCity").on("click", function() {
//$("#submitCity").submit( function() {
	event.preventDefault();
	var city = $("#cityName").val().trim();
	var zip = $("#zipCode").val().trim();
	var search2Push;
    console.log("City Submit button was clicked.");
    console.log("City Name is : " + city);
    console.log("Zip Code is: " + zip);
    // add search city+zip to locationSearches
    search2Push = city + " " + zip;

    // logic to limit to last ten searhes
   	console.log("last10LocationSearches.length = " + last10LocationSearches.length)

    if (last10LocationSearches.length<10){
    	console.log("list < 10")
    	last10LocationSearches.push(search2Push);
	}else{// if already 10 items, pop oldest one off array
    	console.log("list is over 10, popping oldest item")		
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
  	console.log("This is when there has been a recent search");
  	var display = snapshot.child("recentSearches").val();

  	//$("#Weather").text(display);
  	var searchList = snapshot.child("locationArray").val();
  	console.log("Snapshot Array is: " + searchList);
  	$("#Weather").empty();
  	last10LocationSearches = [];
  	for (var i = 0; i<searchList.length;i++){
  		console.log("Item# " + i + " has value of " + searchList[i]);
	    $("#Weather").prepend("<p>" + searchList[i] + "</p>");
	    last10LocationSearches.push(searchList[i]);

  	}
  	console.log("Local array looks like this: " + last10LocationSearches);

  	// loop thru recentSearches.length and display them
  	// add them to last10LocationSearches
  	// make them clickable search items
  }else{
  	console.log("This is when there HAVE NOT BEEN ANY search");
  	//display no recent searches
    $("#Weather").text(currentSearch);

  }

});