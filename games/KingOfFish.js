import { DealStack } from "../card-engine/DealStack.js";
import { DiscardStack } from "../card-engine/DiscardStack.js";
import { GameRules } from "../card-engine/GameRules.js";

//Game Name: King of Fish
export class KingOfFish extends GameRules {
  dealStack = new DealStack([], 0, 52);
  discardStack = new DiscardStack([], 0, 52);

  constructor(){
    super("King of Fish");
  }
  
  init(){}

  async turn(){}

  checkWinConditions(){
    //If cards === 0, end game.
  }
}
