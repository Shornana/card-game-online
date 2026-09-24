import { Player } from "../../Player.js";
import { CardStack, generateStandardCardStacks } from "../../CardStack.js";
import { Card } from "../../Card.js";

const playerTable = document.getElementById("player-table");
const createPlayerButton = document.getElementById("create-player");
const createCardStack = document.getElementById("create-card-stack");
const numberOfCards = document.getElementById("number-of-decks");
const players = [];
let cardStack;
let i = 0;

createPlayerButton.addEventListener('click', function(event){
  addPlayerToTable(event);
})
createCardStack.addEventListener('click', function(event){
  cardStack = generateStandardCardStacks(numberOfCards.value);
  console.log(cardStack);
  console.log("BUTTON CLICKED");
})

function addPlayerToTable(event){
  const newPlayer = new Player(document.getElementById("username").value);
  players.push(newPlayer);
  const row = document.createElement('tr');
  const usernameData = document.createElement('td');
  const extraData = document.createElement('td');
  usernameData.innerHTML = newPlayer.username;
  extraData.innerHTML = i++;
  row.appendChild(usernameData);
  row.appendChild(extraData);
  playerTable.appendChild(row);
}
