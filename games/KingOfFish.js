import { DealStack } from "../card-engine/DealStack.js";
import { DiscardStack } from "../card-engine/DiscardStack.js";
import { CardStack, generateStandardCardStacks } from "../card-engine/CardStack.js";
import { GameRules } from "../card-engine/GameRules.js";
import { Player } from "../card-engine/Player.js";
import { PlayerList } from "../card-engine/PlayerList.js";
import { GraphicsEngine } from "../card-engine/graphics/GraphicsEngine.js";

//Game Name: King of Fish
export class KingOfFish extends GameRules {
  dealStack;
  discardStack;
  graphics = new GraphicsEngine();
  players = new PlayerList();

  constructor(){
    super("King of Fish");
  }
  
  async init(){
    this.discardStack = new DiscardStack([], 0, 52);
    this.dealStack = new DealStack(generateStandardCardStacks(1, true).stack, 0, 52);
    this.dealStack.shuffle();
    for(const player of this.players.playerList){
      player.hand = new CardStack([], 0, 52); //reset each hand
      this.dealStack.deal(player, 7);
      player.hasSwapped = false; // Initalise new swap variable for player.
    }
    this.graphics.renderGraphics();
  }

  async turn(currentPlayerIndex, options){
    //Render Graphics
    this.graphics.renderGraphics();
    const player = this.players.currentPlayer();

    switch (options.decision) {
      case "soft": // Soft swap
        if(player.hasSwapped) {console.error("Already swapped!"); break;}
        if(options.selected.length != 2){
          console.error("Must select 2 cards");
          break;
        }
        player.swapCard(options.selected[0], options.target.hand, options.selected[1]);
        player.hasSwapped = true;
        this.graphics.renderGraphics();
        break;

      case "hard": // Hard swap
        if(player.hasSwapped) {console.error("Already swapped!"); break;}
        if(options.selected.length != 1 && player.hand.getNumberOfCards() != 1) {console.error("Must select 1 card to swap with!"); break;}
        const hardSwapNumber = Number(window.prompt("Which value? (0-13)?:"));
        for(let i = 0; i < options.target.hand.getNumberOfCards(); ++i){
          if(options.target.getCard(i).value === hardSwapNumber){
            if(player.hand.getNumberOfCards() != 1){
              player.sendCard(options.selected[0], options.target.hand);
            }
            options.target.sendCard(i, player.hand);
            player.hasSwapped = true;
            this.graphics.renderGraphics();
            return false; // Player's turn has not ended
          }
        }
        this.dealStack.deal(player, 2);
        player.stillPlaying = false;
        this.graphics.renderGraphics();
        break;
      case "play": // Lay pair
        if(options.selected.length != 2){
          console.error("Must select 2 cards");
          break;
        }
        
        if(player.getCard(options.selected[0]).value === player.getCard(options.selected[1]).value){
          player.sendCard(options.selected[1], this.discardStack);
          player.sendCard(options.selected[0], this.discardStack); //Will need to fix issue where selected 1 should be the higher index otherwise will send wrong card.
        }
        else{
          console.error("Values must match");
          break;
        }
        this.graphics.renderGraphics();
        player.hasSwapped = false;
        player.stillPlaying = false;//Reset before next turn
        break;
      case "pickup": // Pickup
        this.dealStack.deal(player, 1);
        player.hasSwapped = false;
        this.graphics.renderGraphics();
        player.stillPlaying = false;
        break;
    }
  } //ENSURE THAT WE RETURN TRUE OR FALSE DEPENDING ON IF TURN IS DONE!!!

  async playerDecision(){} //Options from GUI interface implementation.

  checkWinConditions(currentPlayerIndex){
    if(this.players.currentPlayer().hand.getNumberOfCards() === 0){
      return true;
    }
    return false;
  }
}
