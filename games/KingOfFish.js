import { DealStack } from "../card-engine/DealStack.js";
import { DiscardStack } from "../card-engine/DiscardStack.js";
import { generateStandardCardStacks } from "../card-engine/CardStack.js";
import { GameRules } from "../card-engine/GameRules.js";
import { Player } from "../card-engine/Player.js";
import { PlayerList } from "../card-engine/PlayerList.js";
import { GraphicsEngine } from "../card-engine/graphics/GraphicsEngine.js";

//Game Name: King of Fish
export class KingOfFish extends GameRules {
  dealStack = new DealStack(generateStandardCardStacks(1, true).stack, 0, 52);
  discardStack = new DiscardStack([], 0, 52);
  graphics = new GraphicsEngine();
  playerList = new PlayerList();

  constructor(){
    super("King of Fish");
  }
  
  async init(){
    this.dealStack.shuffle();
    for(const player of this.playerList.playerList){
      this.dealStack.deal(player, 7);
    }
    this.graphics.renderGraphics();
  }

  async turn(currentPlayerIndex, options){
    //Render Graphics
    this.graphics.renderGraphics();
    if()
  }

  checkWinConditions(currentPlayerIndex){
    if(this.playerList.getPlayerByIndex(currentPlayerIndex).numberOfCards() === 0){
      return true;
    }
    return false;
  }
}
