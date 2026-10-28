const ERROR_CODE = 0, FAILURE = 0;
const SUCCESS = 1;

export class PlayerList{
  constructor(playerList = [], maxSize){
    this.playerList = playerList;
    this.maxSize = maxSize;
    this.currentPlayerIndex =  -1;
  }

  currentPlayer(){
    return this.playerList[this.currentPlayerIndex];
  }

  nextPlayer(){
    if(this.currentPlayerIndex >= this.playerList.length - 1) { this.currentPlayerIndex = 0; return this.currentPlayerIndex; }
    else { return ++this.currentPlayerIndex; }
  }

  addPlayer(player){
    if(player === null) { console.error("Player cannot be null!"); return ERROR_CODE; }
    else {
      if(this.playerList.length >= this.maxSize) { console.log("Maximum occupancy reached."); return FAILURE; }
      else{ this.playerList.push(player); return SUCCESS; }
    }
  }

  removePlayerByIndex(index){
    if(index < 0 || index >= this.playerList.length) { console.error("Index out of bounds!"); return ERROR_CODE; }
    else { this.playerList.splice(index, 1); return SUCCESS; }
  }

  removePlayerById(id){
    for(let i = 0; i < this.playerList.length; ++i){
      if(this.playerList[i].id === id) { this.playerList.splice(i, 1); }
      return SUCCESS;
    }
    return ERROR_CODE; // If player is not in list;
  }

  getPlayerByIndex(index){
    return this.playerList[index];
  }

  getPlayerById(id){
    for(let i = 0; i < this.playerList.length; ++i){
      if(this.playerList[i].id == id) { return this.playerList[i]; } // == because of string values
    }
    return null; // If player is not in list;
  }
}
