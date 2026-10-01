import { CardFunctions } from "./CardFunctions.js";

export class Player {
  constructor(username, id, hand){
    this.username = username;
    this.id = id;
    this.hand = hand;
    this.points = 0;
  }

  getCard(index){
    return this.hand.getCard(index);
  }

  setCard(index, card){
    this.hand.setCard(index, card);
  }

  removeCard(index){
    this.hand.removeCard(index);
  }

  getAllCards(){
    return this.hand.getAllCards();
  }

  addCard(card){
    this.hand.addCard(card);
  }

  removeCards(cards){
    for(let i = 0; i < this.hand.getNumberOfCards(); ++i){
      if(Array.isArray(cards) && cards.includes(this.getCard(i))){
        this.hand.removeCard(i); --i;
      }
      else if (cards == this.hand.getCard(i)){
        this.hand.removeCard(i); break;
      }
    }
  }
  swapCard(curr_index, target, target_index){
    CardFunctions.swap(this, curr_index, target, target_index);
  }
  moveCardsToEnd(source_cards, target){
    CardFunctions.moveToEnd(source_cards, target);
    this.removeCards(source_cards);
  }
  moveCardsToPosition(source_cards, index, target){
    CardFunctions.moveToPoision(source_cards, target, index);
    this.removeCards(source_cards);
  }
}
