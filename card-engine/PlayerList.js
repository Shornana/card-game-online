const ERROR_CODE, FAILURE = 0;
const SUCCESS = 1;

export class PlayerList{
  constructor(playerList = [], maxSize){
    this.playerList = playerList;
    this.maxSize = maxSize;
    this.currentPlayerIndex =  0;
  }

  nextPlayer(){
    if(currentPlayerIndex > playerList.size - 1) { currentPlayerId = 0; return currentPlayerId; }
    else { return ++currentPlayerIndex;}
  }

  addPlayer(player){
    if(player === null) { console.error("Player cannot be null!"); return ERROR_CODE; }
    else { 
      if(playerList.length >= maxSize) { console.log("Maximum occupancy reached."); return FAILURE; }
      else{ this.playerList.push(player); return SUCCESS; }
    }
  }

  removePlayerByIndex(index){
    if(index < 0 || index >= playerList.length) { console.error("Index out of bounds!"); return ERROR_CODE; }
    else { playerList.splice(index, 1); return SUCCESS; }
  }

  removePlayerById(id){
    for(let i = 0; i < playerList.length; ++i){
      if(playerList[i].id === id) { playerList.splice(i, 1); }
      return SUCCESS;
    }
    return ERROR_CODE; // If player is not in list;
  }
}
