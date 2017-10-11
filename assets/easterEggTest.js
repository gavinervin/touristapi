var bw = new Egg("down,up", function(){
  $(".container").css("background-color", '#000')
  $(".container").css("color", '#fff')
  console.log("I get here");
}).listen();
