import { PlayerList } from "./PlayerList.js";

export class GameRoom {
  constructor(id, activePlayers = new PlayerList([], 0), game){
    this.id = id;
    this.activePlayers = activePlayers;
    this.game = game;
  }

  gameActive = false;

  addPlayer(player){
    this.activePlayers.addPlayer(player);
  }

  removePlayerById(id){
    this.activePlayers.removePlayerById(id);
  }

  startGame(){
    if(!this.gameActive){
      this.gameActive = true;
      this.game.players = this.activePlayers;
      this.game.start();
    }
    else{
      console.error("Game already active");
    }
  }
}
