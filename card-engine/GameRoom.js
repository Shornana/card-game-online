export class GameRoom {
  constructor(id, activePlayers = new PlayerList([], 0), game){
    this.id = id;
    this.activePlayers = activePlayers;
    this.game = game;
  }
}
