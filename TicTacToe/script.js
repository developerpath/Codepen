$(document).ready(function(){
  $(".table").animate({top: "25%"}, 350).animate({top: "20%"}, 200);
  var game = {
    comp: "",
    player: "",
    turn: true,
    winner: "false",
    win: [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
  }
  $("button").click(function(){
    game.player = $(this).text();
    switch($(this).text()){
      case "x":
        game.comp = "o";
        break;
      case "o":
        game.comp = "x";
        break;
    }
    console.log(game.comp);
    console.log(game.player);
    $('.table').css("display", "none");
    first();
  })
  function first(){
    var z = Math.floor(Math.random()*10);
    if(z == 1 || z == 3 || z == 5 || z == 7 || z == 9){
      $("#t"+(z-1)).text(game.comp);
      game.turn = false;
    }else{
      $("#t"+z).text(game.comp);
      game.turn = false;
    }
  }
  function fff(){
    while(game.turn){
      var z = Math.floor(Math.random()*10);
      if(z == 9){
        z -=1;
      }
      if($("#t"+z).text() == ""){
        $("#t"+z).text(game.comp);
        game.turn = false;
      }
    }
  }
  $("td").click(function(){
    var s = $(this)[0].id;
    if($(this).text() == "" && game.turn == false){
      $(this).text(game.player);
      game.turn = true;
    }
    for(combo = 0; combo < game.win.length; combo++){
        a = game.win[combo][0];
        b = game.win[combo][1];
        c = game.win[combo][2];
        if($("#t"+a).text() === $("#t"+b).text() && $("#t"+c).text() === "" && $("#t"+a).text() == game.comp){
          $("#t"+c).text(game.comp);
          game.turn = false;
          break;
        }else if($("#t"+b).text() === $("#t"+c).text() && $("#t"+a).text() === "" && $("#t"+b).text() == game.comp){
          $("#t"+a).text(game.comp);
          game.turn = false;
          break;
        }else if($("#t"+a).text() === $("#t"+c).text() && $("#t"+b).text() === "" && $("#t"+c).text() == game.comp){
          $("#t"+b).text(game.comp);
          game.turn = false;
          break;
        }
      }
    if(game.turn){  
    for(combo = 0; combo < game.win.length; combo++){
        a = game.win[combo][0];
        b = game.win[combo][1];
        c = game.win[combo][2];
        if($("#t"+a).text() === $("#t"+b).text() && $("#t"+c).text() === "" && $("#t"+a).text() !== ""){
          $("#t"+c).text(game.comp);
          game.turn = false;
          break;
        }else if($("#t"+b).text() === $("#t"+c).text() && $("#t"+a).text() === "" && $("#t"+b).text() !== ""){
          $("#t"+a).text(game.comp);
          game.turn = false;
          break;
        }else if($("#t"+a).text() === $("#t"+c).text() && $("#t"+b).text() === "" && $("#t"+c).text() !== ""){
          $("#t"+b).text(game.comp);
          game.turn = false;
          break;
        }
      }
    }
      fff();
      for (combo = 0; combo < game.win.length; combo++){
        a = game.win[combo][0];
        b = game.win[combo][1];
        c = game.win[combo][2];
        if ($("#t"+a).text() === $("#t"+b).text() && $("#t"+a).text() === $("#t"+c).text()){
            if ($("#t"+a).text() !== ""){
              switch($("#t"+a).text()){
                case game.comp:
                  alert("Computer WIN!");
                  break;
                case game.player:
                  alert("YOU WIN");
                  break;
              }
              $('td').text("");
              game.moves = 9;
              first();
          } // end if
        } // end if
      } // end for
    for(i=0; i<9; i++){
      if($("#t"+[i]).text() == ""){
        break;
      }
      if(i==8){
        alert("Nobody win!");
        $('td').text("");
        first();
      }
    }
  })
})