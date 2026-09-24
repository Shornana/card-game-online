import {Card} from "./Card.js";

export class CardStack{
  constructor(stack/*, minimum, maximum*/){
    this.stack = stack;
    /*this.minimum = minumum;
    this.maximum = maximum;*/
  }
}

export function generateStandardCardStacks(n){
  const cardStack = [];
  for(let i = 0; i < n; ++i){
    for(let j = 1; j <= 13; ++j){
      cardStack.push(new Card(j, "h"));
      cardStack.push(new Card(j, "d"));
      cardStack.push(new Card(j, "c"));
      cardStack.push(new Card(j, "s"));
    }
  }
  return cardStack;
}
