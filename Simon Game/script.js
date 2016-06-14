$(document).ready(function(){
  var game = {
    btn: ["#red", "#blue", "#green", "#yellow"],
    compMemory: [],
    gameOn: false,
    strict: false,
    round: 0
  };
  function init(){
    game.compMemory = [];
    game.gameOn = true;
    game.round = 0;
  };
  function getNum(){
    return Math.round(Math.random()*10/3);
  };
  function compTurn(){
    var i = 0;
    setInterval(function(){
      $(game.compMemory[i]+" .inner").animate({opacity: 1}, 200);
      $(game.compMemory[i]+" .inner").animate({opacity: 0}, 600);
      i++;
      if(i==game.compMemory.length){
        clearInterval(setInterval);
        playerTurn();
        $(".buttons").on(btnFlash());
      }; 
    },1000);
  };
  function startGame(){
    $(".btn").on({
      mousedown: function(){
        $(this).css({
          boxShadow: 'none',
          transform: 'translateY(5px)'
        });
      },
      mouseup: function(){
        $(this).css({
          boxShadow: '0px 4px 1px #053905',
          transform: 'translateY(0px)'
        });
      }
    });
  };
  function btnFlash(){
    $(".buttons").mousedown(function(){
      $(this).find(".inner").css("opacity", 1);
    });
    $(".buttons").mouseup(function(){
      $(this).find(".inner").css("opacity", 0);
    });
  };
  function count(){
    $('#disp').text(checkR(++game.round));
  }
  function playerTurn(){
    var playerRepeat = game.compMemory.slice(0);
    $(".buttons").click(function(){
        var presentBtn = $(this).attr('id');
        if(presentBtn !== playerRepeat.shift(0).slice(1)){
          if(game.strict){
            init();
            game.compMemory.push(game.btn[getNum()]);
            $('#disp').text(checkR(game.round));
            count();
            compTurn();
            $(".buttons").off();
          }else{
            compTurn();
            $(".buttons").off();
          } 
        }else{
          if(playerRepeat.length == 0){
            game.compMemory.push(game.btn[getNum()]);
            count();
            compTurn();
            $(".buttons").off();
          };
        };
    });
  };
  $('.stick').click(function(){
    if(game.gameOn == false){
      $('#power div').animate({left: "0"}, 100);
      $('#disp').css("color", "red");
      game.gameOn = true;
    }else{
      $('#power div').animate({left: '-38px'}, 100);
      game.gameOn = false;
      $('#disp').css("color", "#5a0000").text("--");
      $(".buttons").off(btnFlash());
      game.compMemory = [];
      game.strict = false;
      $('#strict').css('background-color', '#008181');
    };
  });
  function checkR(r){
    if(r<10){
      return "0"+r;
    }else{
      return r;
    }
  }
  startGame();
  $('.btn').click(function(){
      
      if(game.gameOn == true && $(this).attr('id') == 'start'){
        setTimeout(count, 1000);
        init();
        game.compMemory.push(game.btn[getNum()]);
        $('#disp').text(checkR(game.round));
        $('.buttons').off(compTurn());
      };
    if(game.gameOn == true && $(this).attr('id') == 'strict' && game.strict == false){
      game.strict = true;
      $('#strict').css('background-color', '#00c6c6');
    }else if ($(this).attr('id') == 'strict'){
      game.strict = false;
      $('#strict').css('background-color', '#008181');
    }
  });
});