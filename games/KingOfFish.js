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

  init(){
    gameActive = true;
    currentlyPlaying = true;
    player.hand = new CardStack([], 0, 52);
    bot.hand = new CardStack([], 0, 52);
    deck.deal(player, 7);
    deck.deal(bot, 7);
    refreshPageElements();

    while(gameActive){
      if(currentlyPlaying){
        console.log("Player Turn");
        console.log("Bots Hand:");
        console.log(bot.hand);
        const action = await playerDecision(); // CurrentlyPlaying changes in playerDecision before checking the win condition 
        turn(action);                          //in if statements below meaning bot will always win XD. Terrible programmer you!
      }
      else{
        //BOT LOGIC
        console.log("Bot Turn");
        const action = await performBotTurn();
        currentlyPlaying = true; //Just to return to player for time being
      } 
    }
  }

  async turn(turnoption){
    switch (turnoption) {
      case 1: // Soft swap
        if(hasSwapped) {console.error("Already swapped!"); break;}
        if(number_of_selected_cards != 2){
          console.error("Must select 2 cards");
          break;
        }
        let player_index = -1, bot_index = -1;
        for(let i = 0; i < player_hand.children.length; ++i){
          if(player_hand.children[i].classList.contains('selected')){
            player_index = i;
          }
        }
        for(let i = 0; i < bot_hand.children.length; ++i){
          if(bot_hand.children[i].classList.contains('selected')){
            bot_index = i;
          }
        }
        if(player_index < 0 || bot_index < 0){ console.error("Must select one player and one bot card"); break; }
        const indexOfCard = botKnownCards.indexOf(player.getCard(player_index));
        if(indexOfCard >= 0){
          botKnownCards.splice(indexOfCard, 1);
        }
        botKnownCards.push(bot.getCard(bot_index));
        console.log("Known cards :");
        console.log(botKnownCards);
        
        player.swapCard(player_index, bot, bot_index);
        hasSwapped = true;
        refreshPageElements();
        break;
      case 2: // Hard swap
        if(hasSwapped) {console.error("Already swapped!"); break;}
        if(number_of_selected_cards != 1 && player.hand.getNumberOfCards() != 1) {console.error("Must select 1 card to swap with!"); break;}
        const hardSwapNumber = Number(window.prompt("Which value? (0-13)?:"));
        for(let i = 0; i < bot.hand.getNumberOfCards(); ++i){
          if(bot.getCard(i).value === hardSwapNumber){
            if(player.hand.getNumberOfCards() != 1){
              let indexOfPlayerSwapCard = -1;
              for(let i = 0; i < player_hand.children.length; ++i){
                if(player_hand.children[i].classList.contains('selected')){
                  indexOfPlayerSwapCard = i;
                  break;
                }
              }
              if(indexOfPlayerSwapCard < 0){
                console.error("Must select own card!");
                return 0;
              }
              player.sendCard(indexOfPlayerSwapCard, bot.hand);
            }
            bot.sendCard(i, player.hand);
            hasSwapped = true;
            refreshPageElements();
            checkWinConditions(player);
            return 0;
          }
        }
        deck.deal(player, 2);
        currentlyPlaying = false;
        refreshPageElements();
        break;
      case 3: // Lay pair
        if(number_of_selected_cards != 2){
          console.error("Must select 2 cards");
          break;
        }
        let player_index1 = -1, player_index2 = -1;
        for(let i = 0; i < player_hand.children.length; ++i){
          if(player_hand.children[i].classList.contains('selected')){
            if(player_index1 < 0) {player_index1 = i;}
            else{player_index2 = i; break;}
          }
        }
        if(player_index1 < 0 || player_index2 < 0) {console.error("Must select 2 player cards!"); break; }
        if(player.getHand()[player_index1].value !== player.getHand()[player_index2].value) {console.error("Values must match"); break;}
        const knownIndex1 = botKnownCards.indexOf(player.getCard(player_index1));
        const knownIndex2 = botKnownCards.indexOf(player.getCard(player_index2));
        if(knownIndex2 > knownIndex1 && knownIndex2 >= 0){
          botKnownCards.splice(knownIndex2, 1);
          if(knownIndex1 >= 0) {botKnownCards.splice(knownIndex1, 1);}
        }
        if(knownIndex1 > knownIndex2 && knownIndex1 >= 0){
          botKnownCards.splice(knownIndex1, 1);
          if(knownIndex2 >= 0) {botKnownCards.splice(knownIndex2, 1);}
        }
        player.sendCard(player_index2, discard);
        player.sendCard(player_index1, discard);
        refreshPageElements();
        currentlyPlaying = false;
        hasSwapped = false;
        checkWinConditions(player);
        break;
      case 4: // Pickup
        deck.deal(player, 1);
        hasSwapped = false;
        currentlyPlaying = false;
        refreshPageElements();
        break;
    }
  return 0;
}


  }

  checkWinConditions(){
    //If cards === 0, end game.
  }
}
