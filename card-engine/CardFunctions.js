import { CardStack } from "./CardStack.js";

export class CardFunctions {
  static moveToEnd(sourceCards, targetStack){
    targetStack.appendToEnd(sourceCards);
  }
  static moveToPosition(sourceCards, targetStack, index){
    targetStack.appendToPosition(sourceCards, index);
  }
  static swap(source_player, source_index, target_player, target_index){
    const temp = source_player.getCard(source_index);
    source_player.setCard(source_index, target_player.getCard(target_index));
    target_player.setCard(target_index, temp);
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
