import { GameRules } from "./GameRules.js";

export class Game{
  constructor(gameRules){
    this.gameRules = gameRules;
    this.title = gameRules.title;
    this.gameActive = false;
  }
  players;

  async start(){
    this.gameActive = true;
    await this.gameRules.init();
    while(await this.turn()){ //While the turns are still going.
      //Logging
    }
    console.log("Reached here");
  }

  async turn(){
    if(this.players.nextPlayer().id == 0) // THIS IS THE PLAYER AT THE MOMENT. WILL FIX IN FUTURE. WILL DESIGN FOR SINGLE PLAYER ONLY.
    {
      console.log("PLAYER TURN");
      this.players.currentPlayer().stillPlaying = true;
      while(this.players.currentPlayer().stillPlaying){
        const options = await this.gameRules.playerDecision();
        this.gameRules.turn(this.players.currentPlayer(), options);
      }
    }
    else{ //FOR BOTS
      console.log("BOT TURN");
      console.log(this.players.currentPlayer());
      this.players.currentPlayer().turn(this.gameRules.graphics, this.players.playerList[0], this.gameRules.dealStack, this.gameRules.discardStack); //Replace when turn system better.
      //In fact, what the actual f***. Need to find the best way to find turn information to pass to bot. Maybe another interface?
    }
    return this.next();
  }

  next(){
    if(this.gameRules.checkWinConditions()) { return this.end(); }
    return true;
  }

  end(){
    this.gameActive = false;
    console.log(this.players.currentPlayer().username + " is the Winner!");
    ++this.players.currentPlayer().points;
    this.gameRules.graphics.renderGraphics();
    return false;
  }
} 
