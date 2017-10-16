var blw = new Egg("down,left", function(){
  $(".container").css("background-color", '#000')
  $(".container, #submitCity").css("color", '#fff')
  $("#submitCity").css("background-color",'#444')
}).listen();
//Color Scheme Two:
var gre = new Egg("up,right", function(){
  $(".container").css("background-color",'#2d4412')
  $(".container, #submitCity").css("color", '#f7f6c5')
  $("#submitCity").css("background-color",'#82685c')
}).listen();
//Color Scheme Three:
var pal = new Egg("down, right", function(){
  $(".container").css("background-color",'#ccb5e0')
  $(".container, #submitCity").css("color", '#484354')
  $("#submitCity").css("background-color",'#9c84b2')
}).listen();
//Default:
var def = new Egg("left, up", function(){
  $(".container").css("background-color",'#723d22')
  $(".container, #submitCity").css("color",'#e8cfa2')
  $("#submitCity").css("background-color",'#82685c')
}).listen();