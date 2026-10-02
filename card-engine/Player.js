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

  getHand(){
    return this.hand.getStack();
  }

  addCard(card){
    this.hand.addCard(card);
  }

  swapCard(curr_index, target, target_index){
    CardFunctions.swap(this, curr_index, target, target_index);
  }
  sendCardToEnd(index, target){
    CardFunctions.moveToEnd(this.hand.getCard(index), target);
    this.removeCard(index);
  }
  sendCardToPosition(source_index, target_index, target){
    CardFunctions.moveToPoision(this.hand.getCard(source_index), target, index);
    this.removeCard(source_index);
  }
}
