import { CardStack } from "./CardStack.js";
import { CardFunctions } from "./CardFunctions.js";

const FAILURE = 0; SUCCESS = 1;

export class DealStack extends CardStack {
  constructor(stack, minimum, maximum){
    super(stack, minimum, maximum);
  }

  deal(player, n){
    if(n > this.stack.length){
      for(let i = 0; i < n; ++i){
        CardFunctions.send(this.getCard(0), player.hand); //The 0th element is the top card of the stack.
        this.removeCard(this.getCard(0));
      }
      return SUCCESS;
    }
    else{
      return FAILURE;
    }
  }
}
