//Color Scheme Variant One
var blw = new Egg("down,left", function(){
  $(".container, .weather").css("background-color", '#000')
  $(".container, .weather, #submitCity").css("color", '#fff')
  $("#submitCity").css("background-color",'#444')
  $(".search-button").css({"background-color": '#444' , "color": '#fff'})
}).listen();
//Color Scheme Variant Two:
var gre = new Egg("up,right", function(){
  $(".container, .weather").css("background-color",'#2d4412')
  $(".container, .weather, #submitCity").css("color", '#f7f6c5')
  $("#submitCity").css("background-color",'#82685c')
  $(".search-button").css({"background-color": '#82685c', "color": '#f7f6c5'})
}).listen();
//Color Scheme Variant Three:
var pal = new Egg("down, right", function(){
  $(".container, .weather").css("background-color",'#ccb5e0')
  $(".container, .weather, #submitCity").css("color", '#484354')
  $("#submitCity").css("background-color",'#9c84b2')
  $(".search-button").css({"background-color": '#9c84b2', "color": '#484354'})
}).listen();
//Default:
var def = new Egg("left, up", function(){
  $(".container, .weather").css("background-color",'#723d22')
  $(".container, #submitCity").css("color",'#e8cfa2')
  $("#submitCity").css("background-color",'#82685c')
  $(".search-button").css({"background-color": '#82685c', "color": '#f7f6c5'})
}).listen();


var murderHouse = new Egg("up,up,down,down,left,right,left,right,b,a", function() {
  console.log("easter egg triggered");
  jQuery('#murder-house-img').fadeIn(500, function() {
    window.setTimeout(function() { jQuery('#murder-house-img').hide(); }, 15000);
  });
}).listen();