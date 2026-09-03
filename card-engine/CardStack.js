import {Card} from "Card.js";

export class CardStack{
  constructor(stack, minimum, maximum){
    this.stack = stack;
    this.minimumNumberOfCards = minumum;
    this.maximumNumberOfCards = maximum;
  }

  take(){}
}

export function generateStandardCardStacks(n){
  const cardStack = [];
  for(let i = 0; i < n; ++i){
    for(let j = 1; j <= 13; ++j){
      cardStack.append(new Card(j, "h"));
      cardStack.append(new Card(j, "d"));
      cardStack.append(new Card(j, "c"));
      cardStack.append(new Card(j, "s"));
    }
  }
  return cardstack;
}
