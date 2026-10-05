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
}
