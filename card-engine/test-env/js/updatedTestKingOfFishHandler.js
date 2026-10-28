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
kingOfFish.players = gameRoom.activePlayers;

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

//Selection system
const selection = {sourcePlayer: null, sourceIndex: -1, targetPlayer: null, targetIndex: -1};

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
  resetSelection();
}

// Linking GUI to game logic
kingOfFish.playerDecision = async function(){ //Decision still called even if game is not active. Of course it is you dumbass but it just won't be ran on turn!!!
  const options = {decision: 'error', selected: null, target: null}; // Create options object
  return new Promise((resolve) => {
    soft_swap_button.addEventListener('click', function(event){
      if(selection.sourcePlayer != selection.targetPlayer && selection.sourcePlayer != null && selection.targetPlayer != null)
      {
        options.decision = 'soft';
        if(selection.sourcePlayer === player){
          options.selected = [selection.sourceIndex, selection.targetIndex];
          options.target = bot; //Replace with turn logic.
        }
        else if (selection.targetPlayer === player){
          options.selected = [selection.targetIndex, selection.sourceIndex];
          options.target = bot;
        }
        else{
          options.decision = 'error';
          console.error("Neither player is current player");
        }
      }
      else{
        console.error("Targets are null or same");
      }
      resolve(options);
    });
    hard_swap_button.addEventListener('click', function(event){
      if(selection.sourceIndex >= 0 && selection.targetIndex == -1 && selection.sourcePlayer.id == 0) // Replace zero with proper logic for turns
      {
        options.decision = 'hard';
        options.selected = [selection.sourceIndex];
        options.target = bot; // Replace with proper logic
      }
      resolve(options);
    });
    play_button.addEventListener('click', function(event){
      if(selection.sourcePlayer == selection.targetPlayer && selection.sourcePlayer === player) // Replace with proper logic for turns
      {
        options.decision = 'play';
        //Check cards are lowest index to highest
        if(selection.sourceIndex > selection.targetIndex){
          options.selected = [selection.targetIndex, selection.sourceIndex];
        }
        else{
          options.selected = [selection.sourceIndex, selection.targetIndex];
        }
      }
      else{
        console.error("Must be your cards");
      }
      resolve(options);
    });
    pickup_button.addEventListener('click', function(event){
      options.decision = 'pickup';
      resolve(options);
    });
  })
}

function selectableCard(event){
  const card = event.target;
  const cardIndex = Array.from(card.parentElement.children).indexOf(card);
  const cardParent = card.parentElement.getAttribute('playerid');
  
  //Deselecting player card.
  if(selection.sourcePlayer === gameRoom.activePlayers.getPlayerById(cardParent) && selection.sourceIndex === cardIndex){
    selection.sourcePlayer = selection.targetPlayer; selection.sourceIndex = selection.targetIndex; //Shift target to source
    selection.targetPlayer = null; selection.targetIndex = -1; // Clear target
    card.classList.remove('selected');
    return -1;
  }

  //Deselecting target card
  else if(selection.targetPlayer === gameRoom.activePlayers.getPlayerById(cardParent) && selection.targetIndex === cardIndex){
    selection.targetPlayer = null; selection.targetIndex = -1;
    card.classList.remove('selected');
    return -1;
  }
  
  //Trying to select card when cards already selected
  if(selection.sourceIndex >= 0 && selection.targetIndex >= 0){
    console.error("Cards already selected!");
    return;
  }

  //Select card
  if(selection.sourceIndex == -1){
    selection.sourceIndex = cardIndex;
    selection.sourcePlayer = gameRoom.activePlayers.getPlayerById(cardParent);
    card.classList.add('selected');
  }
  else if(selection.targetIndex == -1){
    selection.targetIndex = cardIndex;
    selection.targetPlayer = gameRoom.activePlayers.getPlayerById(cardParent);
    card.classList.add('selected');
  }
  else{
    console.error("Logic error!");
  }
  //BUGS INCLUDE MULTIPLE SELECTS AND LOGIC ERROR APPEARING EVERY TIME BECAUSE NO RETURNS
}

function resetSelection(){
  selection.sourceIndex = -1; selection.targetIndex = -1;
  selection.sourcePlayer = null; selection.targetPlayer = null;
}

function createCardGraphic(card){
  const td = document.createElement('td');
  if(card.isHidden){
    td.innerHTML = '??';
  }
  else{
    td.innerHTML = card.value + card.suit;
  }

  td.addEventListener('click', function(event){
    selectableCard(event);
  })

  return td;
}

//Event Handlers of HTML objects
start_game_button.addEventListener('click', function(event){
  gameRoom.startGame();
});

//Functionality.

