import { Card } from "./Card.js";

export class CardStack{
  constructor(stack, minimum, maximum){
    this.stack = stack;
    this.minimum = minimum;
    this.maximum = maximum;
  }

  getCard(index){
    return this.stack[index];
  }

  setCard(index, card){
    this.stack[index] = card;
  }

  getStack(){
    return this.stack;
  }

  getNumberOfCards(){
    return this.stack.length;
  }
  addCardToPosition(card, index){ this.stack.splice(index, 0, card); }
  addCard(card){ 
    this.stack.push(card);
  }
  removeCard(index){
    this.stack.splice(index, 1);
  }
}

export function generateStandardCardStacks(n){
  const cs = [];
  for(let i = 0; i < n; ++i){
    for(let j = 1; j <= 13; ++j){
      cs.push(new Card(j, "h"));
      cs.push(new Card(j, "d"));
      cs.push(new Card(j, "c"));
      cs.push(new Card(j, "s"));
    }
  }
  return cs;
}
