import { GameRules } from "./GameRules.js";

export class Game{
  constructor(gameRules, players){
    this.gameRules = gameRules;
    this.players = players;
    this.title = gameRules.title;
    this.gameActive = false;
  }
  async start(){
    this.gameActive = true;
    await this.gameRules.init();
    game();
  }

  async game(){
    if(this.players.nextPlayer() === 0) // THIS IS THE PLAYER AT THE MOMENT. WILL FIX IN FUTURE. WILL DESIGN FOR SINGLE PLAYER ONLY.
    {
      //Need to wait for player's response.
    }
    else{ //FOR BOTS
      this.players.currentPlayer.turn();
    }
    next();
  }

  next(){
    if(this.gameRules.checkWinConditions()) { end(); }
  }

  end(){
    this.gameActive = false;
  }
} 
