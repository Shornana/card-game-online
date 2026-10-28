import { PlayerList } from "./PlayerList.js";

export class GameRoom {
  constructor(id, activePlayers = new PlayerList([], 0), game){
    this.id = id;
    this.activePlayers = activePlayers;
    this.game = game;
  }

  addPlayer(player){
    this.activePlayers.addPlayer(player);
  }

  removePlayerById(id){
    this.activePlayers.removePlayerById(id);
  }

  startGame(){
    if(!this.game.gameActive){
      this.game.players = this.activePlayers;
      this.game.start();
    }
    else{
      console.error("Game already active");
    }
  }
}
