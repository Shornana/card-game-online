import { GameRules } from "./GameRules.js";

export class Game{
  constructor(gameRules){
    this.gameRules = gameRules;
  }
  title = gameRules.title;
  start(){
    init();
  }
  init(){ 
    turn(); 
  }
  turn(){}
  next(){
    if(gameRules.checkWinConditions()) { end(); }
  }
  end(){}
} 
