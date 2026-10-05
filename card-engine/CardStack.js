import { Card } from "./Card.js";

const ERROR_CODE = 0;
const SUCCESS = 1;

export class CardStack{
  constructor(stack, minimum, maximum){
    this.stack = stack;
    this.minimum = minimum;
    this.maximum = maximum;
  }

  getCard(index){
    if(index < 0 || index >= this.stack.length) { console.error("Index out of bounds!"); }
    else { return this.stack[index]; }
  }

  setCard(index, card){
    if(card === null) { console.error("Card cannot be null!"); return ERROR_CODE;  }
    else if(index < 0 || index >= this.stack.length) { console.error("Index out of bounds!"); return ERROR_CODE; }
    else { this.stack[index] = card; return SUCCESS; }
  }

  getStack(){
    return this.stack;
  }

  getNumberOfCards(){
    return this.stack.length;
  }
  addCardToPosition(card, index){ 
    if(card === null) { console.error("Card cannot be null!"); return ERROR_CODE; }
    else if (index < 0 || index >= this.stack.length) { console.error("Index out of bounds!"); return ERROR_CODE; }
    else { this.stack.splice(index, 0, card); return SUCCESS; }
  }

  addCard(card){ 
    if(card === null) { console.error("Card cannot be null!"); return ERROR_CODE; }
    else{ this.stack.push(card); return SUCCESS; }
  }
  removeCard(index){
    if(index < 0 || index >= this.stack.length) { console.error("Index out of bounds!"); return ERROR_CODE; }
    else { this.stack.splice(index, 1); return SUCCESS; }
  }
}

export function generateStandardCardStacks(n, withJokers){
  const cardStack = new CardStack(0, n*52 + 2*n*withJokers, [])
  for(let i = 0; i < n; ++i){
    for(let j = 1; j <= 13; ++j){
      cardStack.addCard(new Card(j, "h")); // Generate hearts. 
      cardStack.addCard(new Card(j, "d")); // Generate diamonds.
      cardStack.addCard(new Card(j, "c")); // Generate clubs.
      cardStack.addCard(new Card(j, "s")); // Generate spades. 
    }
    if(withJokers){
      cardStack.addCard(0, "r"); //Red joker
      cardStack.addCard(0, "b"); //Black joker
    }
  }
  return cardStack;
}
