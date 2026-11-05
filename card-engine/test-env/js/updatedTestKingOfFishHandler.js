import { GameRoom } from "../../GameRoom.js";
import { Game } from "../../Game.js";
import { Player } from "../../Player.js";
import { KingOfFishBot } from "../../../games/KingOfFishBot.js";
import { KingOfFish } from "../../../games/KingOfFish.js";

//Global Variables
const kingOfFish = new KingOfFish();
const player = new Player("Shornana", 0);
const bot = new KingOfFishBot("Jerry Bot", 1);
const bot2 = new KingOfFishBot("Steve Bot", 2);
const bot3 = new KingOfFishBot("Dave Bot", 3);
const game = new Game(kingOfFish);
const gameRoom = new GameRoom(0, undefined, game);
gameRoom.activePlayers.maxSize = 4;

//Setup game room.
gameRoom.addPlayer(player);
gameRoom.addPlayer(bot);
gameRoom.addPlayer(bot2);

//THERE IS NOW AN ISSUE WITH INDEX OUT OF BOUNDS WHEN SOFT SWAPPING. AHHHHHH!!!!!

//FIX IN FUTURE
kingOfFish.players = gameRoom.activePlayers;

const player_hands = []; // Array containing all HTML elements for the tables
const player_scores = []; // Array container all HTML elements for the scores
const bot_container = document.getElementById('players-container');

const start_game_button = document.getElementById("start-game-button");

const deal_pile = document.getElementById('deal-pile');
const discard_pile = document.getElementById("discard-pile");
const player_selection = document.getElementById("other-players");

//Selection system
const selection = {sourcePlayer: null, sourceIndex: -1, targetPlayer: null, targetIndex: -1};

//Graphics for the page.
kingOfFish.graphics.renderGraphics = function(){
  for(const player_hand of player_hands){
    player_hand.innerHTML = '';
    for(const card of gameRoom.activePlayers.getPlayerById(player_hand.getAttribute('playerid')).getHand()){
      if(gameRoom.activePlayers.getPlayerById(player_hand.getAttribute('playerid')).id === 0){ //Player ID always 0 for now.
        card.isHidden = false;
      }
      else{
        card.isHidden = false;
      }
      player_hand.appendChild(createCardGraphic(card));
    }
  }

  for(const player_score of player_scores){
    player_score.innerHTML = `${gameRoom.activePlayers.getPlayerById(player_score.getAttribute('playerid')).points}`; // Need to map the player to the player score using the ID
  }

  deal_pile.innerHTML = '';
  discard_pile.innerHTML = '';

  const discardIndicator = document.createElement('td'); discardIndicator.innerHTML = "??";
  const numberOfCards = document.createElement('td'); numberOfCards.innerHTML = `x ${kingOfFish.dealStack.getNumberOfCards()}`;

  deal_pile.appendChild(discardIndicator);
  deal_pile.appendChild(numberOfCards);

  for(const card of kingOfFish.discardStack.stack){
    card.isHidden = false;
    discard_pile.appendChild(createCardGraphic(card));
  }
  resetSelection();
}

function removeEventsFromButtons(){
  for(const button of Array.from(document.getElementById('player-choice-div').children)){
    const new_button = button.cloneNode(true);
    button.parentNode.replaceChild(new_button, button);
  }
}

// Linking GUI to game logic

kingOfFish.playerDecision = async function(){ //Decision still called even if game is not active. Of course it is you dumbass but it just won't be ran on turn!!!
  removeEventsFromButtons();
  //Declare here to reassosciate buttons after cloning.
  const soft_swap_button = document.getElementById("soft-swap-button");
  const hard_swap_button = document.getElementById("hard-swap-button");
  const play_button = document.getElementById("play-button");
  const pickup_button = document.getElementById("pickup-button");
  const options = {decision: 'error', selected: null, target: null}; // Create options object
  return new Promise((resolve) => {
    soft_swap_button.addEventListener('click', function(event){
      if(selection.sourcePlayer != selection.targetPlayer && selection.sourcePlayer != null && selection.targetPlayer != null)
      {
        options.decision = 'soft';
        if(selection.sourcePlayer === player){
          options.selected = [selection.sourceIndex, selection.targetIndex];
          options.target = selection.targetPlayer; //Replace with turn logic.
        }
        else if (selection.targetPlayer === player){
          options.selected = [selection.targetIndex, selection.sourceIndex];
          options.target = selection.sourcePlayer; // If somehow this triggers.
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
    }, {once : true});
    hard_swap_button.addEventListener('click', function(event){
      if((selection.sourceIndex >= 0 && selection.targetIndex == -1 && selection.sourcePlayer.id == 0) || (selection.sourceIndex == -1 && selection.targetIndex >= 0 && selection.targetPlayer.id == 0)) // Replace zero with proper logic for turns
      {
        options.decision = 'hard';
        options.selected = [(selection.sourceIndex >= 0 ? selection.sourceIndex : selection.targetIndex)];
        options.target = gameRoom.activePlayers.getPlayerById(player_selection.value); // Replace with proper logic
      }
  
      resolve(options);
    }, {once : true});
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
    }, {once : true});
    pickup_button.addEventListener('click', function(event){
      options.decision = 'pickup';
      resolve(options);
    }, {once : true});
  })
}

function createArrayOfTableAndScoreElements(){
  for(const player of gameRoom.activePlayers.playerList){
    createHandForPlayer(player);
    if(player.id !== 0){
      player_selection.appendChild(createPlayerOption(player.username, player.id));
    }
    player_hands.push(document.getElementById(`player-${player.id}`));
    player_scores.push(document.getElementById(`player-${player.id}-score`));
  }
}

function createPlayerOption(username, id){
  const option = document.createElement('option');
  option.innerHTML = username;
  option.value = id;
  return option;
}

function createHandForPlayer(player){
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const h2 = document.createElement('h2');
  h2.innerHTML = `${player.username} Cards (<span id="player-${player.id}-score" playerid="${player.id}">${player.points}</span>):`;
  tbody.id = `player-${player.id}`;
  tbody.setAttribute('playerid', player.id);
  table.appendChild(tbody);
  bot_container.appendChild(h2);
  bot_container.appendChild(table);
}

function selectableCard(event){
  const card = event.target;
  const cardIndex = Array.from(card.parentElement.children).indexOf(card);
  const cardParent = card.parentElement.getAttribute('playerid');
  
  //Deselecting player card.
  if(selection.sourcePlayer === gameRoom.activePlayers.getPlayerById(cardParent) && selection.sourceIndex === cardIndex){
    if(selection.targetPlayer !== null && selection.targetPlayer.id === 0){ //If player card exists as target card, shift target to source. Otherwise, just remove source.
      selection.sourcePlayer = selection.targetPlayer; selection.sourceIndex = selection.targetIndex; //Shift target to source
      selection.targetPlayer = null; selection.targetIndex = -1; // Clear target
    }
    else{
      selection.sourcePlayer = null; selection.sourceIndex = -1; //If target is a different player, keep in target.
    }
    card.classList.remove('selected');
    console.log(selection);
    return -1;
  }

  //Deselecting target card
  else if(selection.targetPlayer === gameRoom.activePlayers.getPlayerById(cardParent) && selection.targetIndex === cardIndex){
    selection.targetPlayer = null; selection.targetIndex = -1;
    card.classList.remove('selected');
    console.log(selection);
    return -1;
  }
  
  //Trying to select card when cards already selected
  if(selection.sourceIndex >= 0 && selection.targetIndex >= 0){
    console.error("Cards already selected!");
    console.log(selection);
    return;
  }

  //Select card
  if(selection.sourceIndex == -1){
    selection.sourceIndex = cardIndex;
    selection.sourcePlayer = gameRoom.activePlayers.getPlayerById(cardParent);
    card.classList.add('selected');
  }
  else if(selection.targetIndex == -1){
    if(cardParent == 0){ //If is player
      selection.targetIndex = selection.sourceIndex;
      selection.targetPlayer = selection.sourcePlayer;
      selection.sourceIndex = cardIndex;
      selection.sourcePlayer = gameRoom.activePlayers.getPlayerById(cardParent);
    } else {
      selection.targetIndex = cardIndex;
      selection.targetPlayer = gameRoom.activePlayers.getPlayerById(cardParent);
    }
    card.classList.add('selected');
  }
  else{
    console.error("Logic error!");
  }
  console.log(selection);
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
  createArrayOfTableAndScoreElements();
  gameRoom.startGame();
});

//Functionality.

