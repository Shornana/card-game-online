import { CardFunctions } from "./CardFunctions.js";

export class Player {
  constructor(username, id, cardstack){
    this.username = username;
    this.id = id;
    this.cardstack = cardstack;
    this.points = 0;
  }

  getCards(numberOfCards, stack){}
  removeCards(cards){
    for(let i = 0; i < cardstack.stack.length; ++i){
      if(cards.includes(cardstack.stack[i])) { cardstack.removeCard(i); --i; }
    }
  }
  swapCard(source_card, target_card){}
  moveCardToEnd(source_cards, target){
    CardFunctions.moveToEnd(source_cards, target);
    removeCards(source_cards);
  }
  moveCardToPosition(source_cards, index, target){
    CardFunctions.moveToPoision(source_cards, index, target);
    removeCards(source_cards);
  }
}
