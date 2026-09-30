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
      if(Array.isArray(cards) && cards.includes(cardstack.stack[i])){ 
        cardstack.removeCard(i); --i; 
      }
      else if (cards == cardstack[i]){
        cardstack.removeCard(i); break;
      }
    }
  }
  swapCard(source_card, target_card){
    CardFunctions.swap(source_card, target_card);
  }
  moveCardsToEnd(source_cards, target){
    CardFunctions.moveToEnd(source_cards, target);
    removeCards(source_cards);
  }
  moveCardsToPosition(source_cards, index, target){
    CardFunctions.moveToPoision(source_cards, target, index);
    removeCards(source_cards);
  }
}
