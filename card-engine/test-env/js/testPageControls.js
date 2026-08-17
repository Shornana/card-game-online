import { Player } from "../../Player.js";
const playerTable = document.getElementById("player-table");
const createPlayerButton = document.getElementById("create-player");
const players = [];
let i = 0;

createPlayerButton.addEventListener('click', function(event){
  addPlayerToTable(event);
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
