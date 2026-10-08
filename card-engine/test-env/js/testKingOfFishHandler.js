import { GameRoom } from "../../GameRoom.js";
import { Game } from "../../Game.js";
import { GameRules } from "../../GameRules.js";
import { Player } from "../../Player.js";
import { Bot } from "../../Bot.js";
import { PlayerList } from "../../PlayerList.js";
import { CardStack, generateStandardCardStacks } from "../../CardStack.js";
import { DealStack } from "../../DealStack.js";
import { KingOfFish } from "../../../games/KingOfFish.js";

import { CardFunctions } from "../../CardFunctions.js";

//Global Variables
const player = new Player("Shornana", 0, new CardStack([], 0, 52));
const bot = new Bot("Bot", 1, new CardStack([], 0, 52));
const playerList = new PlayerList([player, bot], 2);
const gameRules = new KingOfFish();
const game = new Game(gameRules);
const gameRoom = new GameRoom(0, playerList, game);
let hasSwapped = false;

const cards = generateStandardCardStacks(1, true);
const deck = new DealStack(cards.stack, 0, 52);
const discard = new CardStack([], 0, 52);
deck.shuffle();

//Player variables
let currentlyPlaying = false;
let gameActive = false;
let number_of_selected_cards = 0;
//Bot variables

//Declaration of HTML objects
const player_hand = document.getElementById("player-hand");
const player_score = document.getElementById("player-score");
const bot_hand = document.getElementById("bot-hand");
const bot_score = document.getElementById("bot-score");

const start_game_button = document.getElementById("start-game-button");

const soft_swap_button = document.getElementById("soft-swap-button");
const hard_swap_button = document.getElementById("hard-swap-button");
const play_button = document.getElementById("play-button");
const pickup_button = document.getElementById("pickup-button");

//Event Handlers of HTML objects
start_game_button.addEventListener('click', function(event){
  start();
});
//Functionality.

function test(event){
  window.alert("Clicked " + event.target.id);
}

async function start(){
  gameActive = true;
  currentlyPlaying = true;
  deck.deal(player, 7);
  deck.deal(bot, 7);
  refreshPageElements();

  while(gameActive){
    if(currentlyPlaying){
      console.log("Player Turn");
      const action = await playerDecision();
      turn(action);
    }
    else{
      //BOT LOGIC
      console.log("Bot Turn");
      currentlyPlaying = true; //Just to return to player for time being
    }

    if(!gameActive && currentlyPlaying){
           //PLAYER WIN
    }
    else if(!gameActive && !currentlyPlaying){
            //BOT WIN
    }
  }
}

function turn(turnoption){
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
        player.swapCard(player_index, bot, bot_index);
        hasSwapped = true;
        refreshPageElements();
        break;
      case 2: // Hard swap
        if(hasSwapped) {console.error("Already swapped!"); break;}
        const hardSwapNumber = Number(window.prompt("Which value? (0-13)?:"));
        for(let i = 0; i < bot.hand.getNumberOfCards(); ++i){
          if(bot.getCard(i).value === hardSwapNumber){
            bot.sendCard(i, player.hand);
            hasSwapped = true;
            refreshPageElements();
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
        player.sendCard(player_index2, discard);
        player.sendCard(player_index1, discard);
        refreshPageElements();
        currentlyPlaying = false;
        hasSwapped = false;
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

async function playerDecision(){
  return new Promise((resolve) => {
    soft_swap_button.addEventListener('click', function(event){
      resolve(1);
    });
    hard_swap_button.addEventListener('click', function(event){
      resolve(2);
    });
    play_button.addEventListener('click', function(event){
      resolve(3);
    });
    pickup_button.addEventListener('click', function(event){
      resolve(4);
    });
  })
}

function refreshPageElements(){
  player_hand.innerHTML = '';
  bot_hand.innerHTML = '';

  number_of_selected_cards = 0;

  for(const card of player.getHand()){
    player_hand.appendChild(createCardElement(card.value, card.suit));
  }
  for(const card of bot.getHand()){
    bot_hand.appendChild(createCardElement(card.value, card.suit));
  }
}

function selectCard(event){
  const selectedCard = event.target;
  if(selectedCard.classList.contains('selected')){
    --number_of_selected_cards;
    selectedCard.classList.remove('selected');
  }
  else if (number_of_selected_cards >= 2){
    console.error("Trying to select more than 2 cards");
  }
  else{
    selectedCard.classList.add('selected');
    ++number_of_selected_cards;
  }
}

function createCardElement(value, suit){
  const table_datum = document.createElement('td');
  table_datum.innerHTML = value + suit;
  table_datum.addEventListener('click', function(event){ selectCard(event); })
  return table_datum;
}
