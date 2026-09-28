export class Player {
  constructor(username, id, cardstack){
    this.username = username;
    this.id = id;
    this.cardstack = cardstack;
    this.points = 0;
  }

  getCards(){}
  removeCards(){}
  swapCard(){}
  moveCard(){}
}
