import { CardStack } from "./CardStack.js";

export class CardFunctions {
  static send(sourceCard, targetStack){
    if(sourceCard === null) { console.error("Source card cannot be null!"); return 0; }
    else if(targetStack === null) { console.error("Target stack cannot be null!"); return 0; }
    else { targetStack.addCard(sourceCard); return 1; } 
  }
  static sendToPosition(sourceCard, targetStack, index){
    if(sourceCard !== null) { console.error("Source card cannot be null!"); }
    else if(targetStack === null) { console.error("Target stack cannot be null!"); }
    else { targetStack.addCardToPosition(sourceCard, index); }
  }
  static swap(source_player, source_index, target_player, target_index){
    if(source_player === null) { console.error("Source player cannot be null!"); }
    else if(target_player === null) { console.error("Target player cannot be null!"); }
    else{
      const temp = source_player.getCard(source_index);
      source_player.setCard(source_index, target_player.getCard(target_index));
      target_player.setCard(target_index, temp);
    }
  }

  static shuffle(cardStack){ // Will require reformatting and adjustments after changes to mutliple files (Potentially not??)
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
