import { Player } from "../../Player.js";
import { CardStack, generateStandardCardStacks } from "../../CardStack.js";
import { Card } from "../../Card.js";
import { CardFunctions } from "../../CardFunctions.js";

let GLOBAL_CURRENT_ID = 0;
let current_player = null;
let selected_player = null;
const playerList = [];

// Page Elements
const PLAYER_TABLE = document.getElementById('player-table-body');
const CURRENT_PLAYER_NAME = document.getElementById('current-player-name');
const CURRENT_PLAYER_ID = document.getElementById('current-player-id');
const CURRENT_PLAYER_HAND = document.getElementById('current-player-hand');
const CURRENT_PLAYER_CARD_INDEX = document.getElementById('current-card-index-input');
const SELECTED_PLAYER_NAME = document.getElementById('selected-player-name');
const SELECTED_PLAYER_ID = document.getElementById('selected-player-id');
const SELECTED_PLAYER_HAND = document.getElementById('selected-player-hand');
const SELECTED_PLAYER_CARD_INDEX = document.getElementById('selected-card-index-input');
const ADD_CARD_BUTTON = document.getElementById('add-card-button');
const ADD_PLAYER_BUTTON = document.getElementById('add-player-button');
const REMOVE_PLAYER_BUTTON = document.getElementById('remove-player-button');
const REMOVE_CARD_BUTTON = document.getElementById('remove-card-button');
const SEND_CARD_BUTTON = document.getElementById('send-card-button');
const SWAP_CARD_BUTTON = document.getElementById('swap-card-button');
const SET_SELECTED_AS_CURRENT_BUTTON = document.getElementById('set-selected-as-current-button');
const CARD_VALUE_SELECT = document.getElementById('card-value-select');
const CARD_SUIT_SELECT = document.getElementById('card-suit-select');
const PLAYER_NAME_INPUT = document.getElementById('player-name-input');

ADD_CARD_BUTTON.addEventListener('click', function(event){
  addCard(CARD_VALUE_SELECT.value, CARD_SUIT_SELECT.value);
});
ADD_PLAYER_BUTTON.addEventListener('click', function(event){
  addPlayer(PLAYER_NAME_INPUT.value);
});
REMOVE_CARD_BUTTON.addEventListener('click', function(event){

});
REMOVE_PLAYER_BUTTON.addEventListener('click', function(event){

});
SEND_CARD_BUTTON.addEventListener('click', function(event){

});
SWAP_CARD_BUTTON.addEventListener('click', function(event){

});
SET_SELECTED_AS_CURRENT_BUTTON.addEventListener('click', function(event){
  setCurrentPlayerAsSelected();
})

function addPlayer(playerName){
  const newPlayer = new Player(playerName, GLOBAL_CURRENT_ID++, []);
  playerList.push(newPlayer);
  addPlayerToTable(newPlayer);
  return 1;
}

function addPlayerToTable(player){
  const table_row = document.createElement('tr');
  const player_name = document.createElement('td'); player_name.innerText = player.username;
  const player_id = document.createElement('td'); player_id.innerText = player.id;
  const player_select = document.createElement('td');
  const player_select_button = document.createElement('button');
  player_select_button.innerText = "Select";
  player_select_button.addEventListener('click', function(event){
    selectPlayer(event);
  });
  player_select.appendChild(player_select_button);
  table_row.appendChild(player_name);
  table_row.appendChild(player_id);
  table_row.appendChild(player_select);
  PLAYER_TABLE.appendChild(table_row);
  return 1;
}

function removePlayer(playerID){

}

function addCard(value, suit){
  current_player.cardstack.push(new Card(value, suit));
  refershScreenData();
}

function selectPlayer(event){
  const player_id = event.target.parentElement.parentElement.children[1].innerText;
  for(const player of playerList){
    if(parseInt(player_id) === player.id){
      selected_player = player;
    }
  }
  if(current_player === null) {current_player = selected_player;}
  refershScreenData();
  return 0;
}

function setCurrentPlayerAsSelected(){
  current_player = selected_player;
  refershScreenData();
}

function refershScreenData(){
  SELECTED_PLAYER_ID.innerText = selected_player.id;
  SELECTED_PLAYER_NAME.innerText = selected_player.username;
  CURRENT_PLAYER_ID.innerText = current_player.id;
  CURRENT_PLAYER_NAME.innerText = current_player.username;
  refreshCards();
}

function refreshCards(){
  CURRENT_PLAYER_HAND.innerHTML = ''; //Clear the current-player-hand-tbody
  SELECTED_PLAYER_HAND.innerHTMl = ''; // Clear the selected-player-hand-tbody
  for(const card of current_player.cardstack){
    const cardElement = document.createElement('td');
    cardElement.innerText = card.value + card.suit;
    CURRENT_PLAYER_HAND.appendChild(cardElement);
  }
  for(const card of selected_player.cardstack){
    const cardElement = document.createElement('td');
    cardElement.innerText = card.value + card.suit;
    SELECTED_PLAYER_HAND.appendChild(cardElement);
  }
}
