import { DealStack } from "../card-engine/DealStack.js";
import { DiscardStack } from "../card-engine/DiscardStack.js";
import { generateStandardCardStacks } from "../card-engine/CardStack.js";
import { GameRules } from "../card-engine/GameRules.js";
import { Player } from "../card-engine/Player.js";
import { GraphicsEngine } from "../card-engine/graphics/GraphicsEngine.js";

//Game Name: King of Fish
export class KingOfFish extends GameRules {
  dealStack = new DealStack([], 0, 52);
  discardStack = new DiscardStack(g, 0, 52);
  graphics = new GraphicsEngine();

  constructor(){
    super("King of Fish");
  }
  
  init(){
    dealStack
    graphics.renderGraphics();
  }

  async turn(){
    graphics.renderGraphics();
  }

  checkWinConditions(){
    //If cards === 0, end game.
  }
}
