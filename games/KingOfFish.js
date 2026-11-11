import { DealStack } from "../card-engine/DealStack.js";
import { DiscardStack } from "../card-engine/DiscardStack.js";
import { CardStack, generateStandardCardStacks } from "../card-engine/CardStack.js";
import { GameRules } from "../card-engine/GameRules.js";
import { Player } from "../card-engine/Player.js";
import { PlayerList } from "../card-engine/PlayerList.js";
import { GraphicsEngine } from "../card-engine/graphics/GraphicsEngine.js";
import { GameLogger } from "../card-engine/GameLogger.js"

//Game Name: King of Fish
export class KingOfFish extends GameRules {
  dealStack;
  discardStack;
  graphics = new GraphicsEngine();
  players = new PlayerList();

  constructor(gameLogger){
    super("King of Fish", gameLogger);
  }
  
  async init(){
    this.gameLogger.clear();
    this.discardStack = new DiscardStack([], 0, 52);
    this.dealStack = new DealStack(generateStandardCardStacks(1, true).stack, 0, 52);
    this.dealStack.shuffle();
    for(const player of this.players.playerList){
      player.hand = new CardStack([], 0, 52); //reset each hand
      this.dealStack.deal(player, 7);
      this.gameLogger.log(player.username, "has been given 7 cards");
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
        if(player.hasSwapped) {console.error("Already swapped!"); this.gameLogger.error(player.username, "Already swapped!"); break;}
        if(options.selected.length != 2){
          this.gameLogger.error(player.username, "Must select 2 cards");
          console.error("Must select 2 cards");
          break;
        }
        this.gameLogger.log(player.username, "swapped cards.");
        if(player.hand.getNumberOfCards() === 1 && player.getCard(options.selected[0]).value === options.target.getCard(options.selected[1]).value){
          options.target.sendCard(options.selected[1], player);
          this.gameLogger.log(player.username, "Matched swap on value");
        } else {
          this.gameLogger.log(player.username, "Didn't match swap on value");
          player.swapCard(options.selected[0], options.target.hand, options.selected[1]);
        }
        player.hasSwapped = true;
        this.graphics.renderGraphics();
        break;

      case "hard": // Hard swap
        if(player.hasSwapped) {console.error("Already swapped!"); this.gameLogger.error(player.username, "Already swapped!"); break;}
        if(options.selected.length != 1 && player.hand.getNumberOfCards() != 1) {console.error("Must select 1 card to swap with!"); this.gameLogger.error(player.username, "Must select 1 card to swap with!"); break;}
        const hardSwap = window.prompt(`Which card value do you want to swap from ${options.target.username}? (0-13)?:`);
        const hardSwapNumber = Number(hardSwap);
        if(hardSwap === null){
          console.error("Cancelled hard swap.");
          this.gameLogger.error(player.username, "Cancelled hard swap.");
          return false;
        }
        else if(hardSwapNumber < 0 || hardSwapNumber > 13){
          console.error("Number must be in range 0 - 13");
          this.gameLogger.error(player.username, "Number must be in range 0-13");
          return false;
        }
        for(let i = 0; i < options.target.hand.getNumberOfCards(); ++i){
          if(options.target.getCard(i).value === hardSwapNumber){
            if(player.hand.getNumberOfCards() != 1){
              player.sendCard(options.selected[0], options.target.hand);
            }
            this.gameLogger.log(player.username, "successfully swapped.");
            options.target.sendCard(i, player.hand);
            player.hasSwapped = true;
            this.graphics.renderGraphics();
            return false; // Player's turn has not ended
          }
        }
        this.gameLogger.log(player.username, "failed to swap.");
        this.dealStack.deal(player, 2);
        player.stillPlaying = false;
        this.graphics.renderGraphics();
        break;
      case "play": // Lay pair
        if(options.selected.length != 2){
          this.gameLogger.error(player.username, "Must select 2 cards"); 
          console.error("Must select 2 cards");
          break;
        }
        
        if(player.getCard(options.selected[0]).value === player.getCard(options.selected[1]).value){
          this.gameLogger.log(player.username, "laid down a pair.");
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
        this.gameLogger.log(player.username, "picked up.");
        this.dealStack.deal(player, 1);
        player.hasSwapped = false;
        this.graphics.renderGraphics();
        player.stillPlaying = false;
        break;
      case "error":
        this.gameLogger.error(player.username, "Invalid input.");
        console.error("Invalid input.");
        break;
        return false;
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
