import { CardFunctions } from "./CardFunctions.js";

export class Player {
  constructor(username, id, cardstack){
    this.username = username;
    this.id = id;
    this.cardstack = cardstack;
    this.points = 0;
  }

  getCards(numberOfCards, stack){}
  removeCards(cards){}
  swapCard(source_card, target_card){}
  moveCardToEnd(source_cards, target){
    CardFunctions.moveToEnd(source_cards, target);
    for(let i = 0; i < cardstack.stack.length; ++i){
      if(cardstack.stack[i] in source_cards) { cardstack.removeCard(i); --i; }
    }
  }
  moveCardToPosition(source_card, index, target){

  }
}
