import { CardStack } from "./CardStack.js";

export class CardFunctions {
  static move(sourceCard, targetStack){
    //Need to transfer ownership of the card.
    //Therefore we need to remove the sourceCard from the owner's stack.
    //Once we have done that, we need to append it to the target stack.
    //Perhaps the removal implementation can be handled by the mover.
    targetStack.append(sourceCard);
  }
  static swap(sourceCard, targetCard){
    //Need to transfer ownership of each card to one another.
    //We can use temporary objects to transfer the cards
    tempCard = sourceCard;
    sourceCard = targetCard;
    targetCard = tempCard;
  }
  static deal(player, stack){
    //We simply need to move the top card from stack to the player.
  }
  static shuffle(cardStack){
    const copyCardStack = [...cardStack.stack]
    const shuffledStackArray = [];
    const noOfCards = cardStack.stack.length;
    for(let i = 0; i < noOfCards; ++i){
      const randomIndex = Math.floor(Math.random() * (noOfCards - i));
      const randomCard = copyCardStack[randomIndex];
      copyCardStack.splice(randomIndex, 1);
      shuffledStackArray.push(randomCard);
    }
    cardStack.stack = shuffledStackArray;
    return 0;
  }
}
