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
  }

  async turn(){
    if(this.players.nextPlayer() === 0) // THIS IS THE PLAYER AT THE MOMENT. WILL FIX IN FUTURE. WILL DESIGN FOR SINGLE PLAYER ONLY.
    {
      this.players.currentPlayer().stillPlaying = true;
      while(this.players.currentPlayer().stillPlaying){
        const options = await this.gameRules.playerDecision();
        this.gameRules.turn(this.players.currentPlayer(), options);
      }
    }
    else{ //FOR BOTS
      this.players.currentPlayer.turn();
    }
    return this.next();
  }

  next(){
    if(this.gameRules.checkWinConditions()) { return this.end(); }
    return true;
  }

  end(){
    this.gameActive = false;
    return false;
  }
} 
