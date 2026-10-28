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
  players = new PlayerList();

  constructor(){
    super("King of Fish");
  }
  
  async init(){
    this.dealStack.shuffle();
    for(const player of this.players.playerList){
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
       // let player_index = -1, bot_index = -1;
       // for(let i = 0; i < player_hand.children.length; ++i){
       //   if(player_hand.children[i].classList.contains('selected')){
       //     player_index = i;
       //   }
       // }
       // for(let i = 0; i < bot_hand.children.length; ++i){
       //   if(bot_hand.children[i].classList.contains('selected')){
       //     bot_index = i;
       //   }
       // }
       // if(player_index < 0 || bot_index < 0){ console.error("Must select one player and one bot card"); break; }
       // const indexOfCard = botKnownCards.indexOf(player.getCard(player_index));
       // if(indexOfCard >= 0){
       //   botKnownCards.splice(indexOfCard, 1);
       // }
       // botKnownCards.push(bot.getCard(bot_index));
       // console.log("Known cards :");
       // console.log(botKnownCards);
       // OLD WAY OF SPECIFYING SELECTED CARDS AND ADDING TO KNOWN BOTS CARDS. WILL SEND JSON OF DATA NOW. 
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
              // let indexOfPlayerSwapCard = -1;
              // for(let i = 0; i < player_hand.children.length; ++i){
              //   if(player_hand.children[i].classList.contains('selected')){
              //     indexOfPlayerSwapCard = i;
              //     break;
              //   }
              // }
              // if(indexOfPlayerSwapCard < 0){
              //   console.error("Must select own card!");
              //   return 0;
              // }
              // OLD SYSTEM OF FINDING SELECTED CARD. FIND IT IN THE OPTIONS
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
        //let player_index1 = -1, player_index2 = -1;
        //for(let i = 0; i < player_hand.children.length; ++i){
        //  if(player_hand.children[i].classList.contains('selected')){
        //    if(player_index1 < 0) {player_index1 = i;}
        //    else{player_index2 = i; break;}
        //  }
        //}
        //if(player_index1 < 0 || player_index2 < 0) {console.error("Must select 2 player cards!"); break; }
        //if(player.getHand()[player_index1].value !== player.getHand()[player_index2].value) {console.error("Values must match"); break;}
        //const knownIndex1 = botKnownCards.indexOf(player.getCard(player_index1));
        //const knownIndex2 = botKnownCards.indexOf(player.getCard(player_index2));
        //if(knownIndex2 > knownIndex1 && knownIndex2 >= 0){
        //  botKnownCards.splice(knownIndex2, 1);
        //  if(knownIndex1 >= 0) {botKnownCards.splice(knownIndex1, 1);}
        //}
        //if(knownIndex1 > knownIndex2 && knownIndex1 >= 0){
        //  botKnownCards.splice(knownIndex1, 1);
        //  if(knownIndex2 >= 0) {botKnownCards.splice(knownIndex2, 1);}
        //}
        //OLD SYSTEM FOR FINDING SELECTED. USE OPTIONS. INTRODUCE BETTER BOT RECOGINITION SYSTEM.
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
