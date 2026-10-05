import { GameRules } from "./GameRules.js";

export class Game{
  constructor(gameRules){
    this.gameRules = gameRules;
  }
  title = gameRules.title;
  start(){}
  init(){}
  turn(){}
  next(){}
  end(){}
} 
