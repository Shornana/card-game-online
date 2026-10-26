import { GameRoom } from "../../GameRoom.js";
import { Game } from "../../Game.js";
import { Player } from "../../Player.js";
import { KingOfFishBot } from "../../../games/KingOfFishBot.js";
import { KingOfFish } from "../../../games/KingOfFish.js";

//Global Variables
const kingOfFish = new KingOfFish();
const player = new Player("Shornana", 0);
const bot = new KingOfFishBot("Jerry Bot", 1);
const game = new Game(kingOfFish);
const gameRoom = new GameRoom(0, undefined, game);
gameRoom.activePlayers.maxSize = 2;

//Setup game room.
gameRoom.addPlayer(player);
gameRoom.addPlayer(bot);

//FIX IN FUTURE
kingOfFish.playerList = gameRoom.activePlayers;

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

//Graphics for the page.
kingOfFish.graphics.renderGraphics = function(){
  player_score.innerHTML = player.points;
  bot_score.innerHTML = player.points;
  player_hand.innerHTML = ''; //Clear player hand.
  bot_hand.innerHTML = ''; // Clear bot hand.
  for(const card of player.getHand()){
    player_hand.appendChild(createCardGraphic(card));
  }
  for(const card of bot.getHand()){
    bot_hand.appendChild(createCardGraphic(card));
  }
}

// Linking GUI to game logic
kingOfFish.playerDecision = async function(){
  const options = {}; // Create options object
  return new Promise((resolve) => {
    soft_swap_button.addEventListener('click', function(event){
      resolve(options);
    });
    hard_swap_button.addEventListener('click', function(event){
      resolve(options);
    });
    play_button.addEventListener('click', function(event){
      resolve(options);
    });
    pickup_button.addEventListener('click', function(event){
      resolve(options);
    });
  })
}

function createCardGraphic(card){
  const td = document.createElement('td');
  if(card.isHidden){
    td.innerHTML = '??';
  }
  else{
    td.innerHTML = card.value + card.suit;
  }
  return td;
}

//Event Handlers of HTML objects
start_game_button.addEventListener('click', function(event){
  gameRoom.startGame();
});

//Functionality.

