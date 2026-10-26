import { GameRules } from "./GameRules.js";

export class Game{
  constructor(gameRules){
    this.gameRules = gameRules;
    this.title = gameRules.title;
    this.gameActive = false;
  }
  start(){
    this.gameActive = true;
    this.gameRules.init();
  }
  next(){
    if(gameRules.checkWinConditions()) { end(); }
  }

  end(){
    this.gameActive = false;
  }
} 
