export class CardFunctions {
  move(sourceCard, targetStack){
    //Need to transfer ownership of the card.
    //Therefore we need to remove the sourceCard from the owner's stack.
    //Once we have done that, we need to append it to the target stack.
    //Perhaps the removal implementation can be handled by the mover.
  }
  swap(sourceCard, targetCard){
    //Need to transfer ownership of each card to one another.
    //We can use temporary objects to transfer the cards.
  }
  deal(player, stack){
    //We simply need to move the top card from stack to the player.
  }
}
