import { CardStack } from "./CardStack.js";
import { CardFunctions } from "./CardFunctions.js";

export class DealStack extends CardStack {
  constructor(stack, minimum, maximum){
    super(stack, minimum, maximum);
  }

  deal(player){
    CardFunctions.send(this.getCard(0), player); //The 0th element is the top card of the stack.
    this.removeCard(this.getCard(0));
  }
}
