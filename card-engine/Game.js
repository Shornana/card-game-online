import { GameRules } from "./GameRules.js";

export class Game{
  constructor(gameRules){
    this.gameRules = gameRules;
    this.title = gameRules.title;
    this.gameActive = false;
  }
  start(){
    this.gameActive = true;
    init();
  }
  init(){console.error("Incomplete init function.");}

  async turn(){console.error("Incomplete turn function".);}

  next(){
    if(gameRules.checkWinConditions()) { end(); }
  }
  end(){
    this.gameActive = false;
  }
} 
