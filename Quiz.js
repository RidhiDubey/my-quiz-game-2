class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("pink");
    //write code to show a heading for showing the result of Quiz
    fill("orange");
    textSize(25);
    text("result of the quiz",200,200);
    //call getContestantInfo( ) here
    Contestant.getContestantInfo();

    //write condition to check if contestantInfor is not undefined
    
    //write code to add a note here
    if(allContestants!==undefined){
      fill("purple");
      textSize(20);
      text("NOTE: Contestants who answered correctly are highlighted in green",625,625);
    }
    //write code to highlight contest who answered correctly

    var y=200;
    
    for(var contestant in allContestants){
      var corAns="2";
      if(corAns===allContestants[contestant].answer){
        fill("green");
      }
      else{
        fill("red");
      }
      y=y+30;
      textSize(20);
      text(allContestants[contestant].name+" : "+allContestants[contestant].answer,250,y);
    }
  }

}
