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
  if(!gameActive)
    { /*Start();*/}
});
//Functionality.

