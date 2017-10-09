console.log("javascript file is working");



$("#submitCity").on("click", function() {
//$("#submitCity").submit( function() {
	event.preventDefault();
    console.log("City Submit button was clicked.");

	// alert for testing
    alert("City Submit button was clicked.");

  });