import { CardStack } from "./CardStack.js";

export class CardFunctions {
  static send(sourceCard, targetStack){
    targetStack.addCard(sourceCard);
  }
  static sendToPosition(sourceCard, targetStack, index){
    targetStack.addCardToPosition(sourceCard, index);
  }
  static swap(source_player, source_index, target_player, target_index){
    const temp = source_player.getCard(source_index);
    source_player.setCard(source_index, target_player.getCard(target_index));
    target_player.setCard(target_index, temp);
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
