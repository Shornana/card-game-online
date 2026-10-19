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
  
  init(){
    dealStack.shuffle();
    graphics.renderGraphics();
  }

  async turn(){
    //Render Graphics
    graphics.renderGraphics();
    let currentPlayerIndex = playerList.nextPlayer();
    if(currentPlayerIndex === playerList.indexOf(player))
    {
      
    }
    elseif(currentPlayerIndex === playerList.indexOf(bot)) //Check if player is a bot.
    {
      const response = await bot.turn();
      graphics.renderGraphics();
      if(checkWinConditions(currentPlayerIndex)){ return false; }
      else{ return true; }
    }
  }

  checkWinConditions(currentPlayerIndex){
    if(playerList.getPlayerByIndex(currentPlayerIndex).numberOfCards() === 0){
      return true;
    }
    return false;
  }
}
