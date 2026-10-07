import { GameRoom } from "../../GameRoom.js";
import { Game } from "../../Game.js";
import { GameRules } from "../../GameRules.js";
import { Player } from "../../Player.js";
import { Bot } from "../../Bot.js";
import { PlayerList } from "../../PlayerList.js";
import { CardStack } from "../../CardStack.js";
import { KingOfFish } from "../../../games/KingOfFish.js";

//Global Variables
const player = new Player("Shornana", 0, new CardStack(0, 52, []));
const bot = new Bot("Bot", 1, new CardStack(0, 52, []));
const playerList = new PlayerList([player, bot], 2);
const gameRules = new KingOfFish();
const game = new Game(gameRules);
const gameRoom = new GameRoom(0, playerList, game);


//Player variables
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
soft_swap_button.addEventListener('click', function(event){
  test(event);
});
hard_swap_button.addEventListener('click', function(event){
  test(event);
});
play_button.addEventListener('click', function(event){
  test(event);
});
pickup_button.addEventListener('click', function(event){
  test(event);
});
//Functionality.

function test(event){
  window.alert("Clicked " + event.target.id);
}

function start(){
  for(let i = 1; i <= 3; ++i){
    player_hand.appendChild(createCardElement(i, 'c'));
    bot_hand.appendChild(createCardElement(i + 3, 'h'));
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
