import { Card } from "./Card.js";

export class CardStack{
  constructor(stack, minimum, maximum){
    this.stack = stack;
    this.minimum = minimum;
    this.maximum = maximum;
  }
  
  appendToPosition(cards, index){ stack.splice(index, 0, ...cards); }
  appendToEnd(cards){ 
    if(Array.isArray(cards)) {
      this.stack.push(...cards);
    } else {
      this.stack.push(cards);
    }
  }
  removeCard(index){ this.stack.splice(index, 1); }
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
