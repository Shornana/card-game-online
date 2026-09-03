//Game Name: King of Fish
class KingOfFish extends GameRules {
  const dealStack = new CardStack();
  const discardStack = new CardStack();

  init(){
    //Initialise gameRoom defaults.
    gameRoom.dealStack = dealStack;
    gameRoom.discardStack = discardStack;
    //Initialise dealing deck.
    dealStack.generateStack(1);
    dealStack.shuffle();

    const startingPlayerIndex = random.randInt(0, gameRoom.activePlayers.length);
    for(const player of gameRoom.activePlayers){
      player.getCards(7, dealStack);
    }
  }
  turn(){
    let actionCompleted = false;
    while (true){ //Turn hasn't ended.
      await response(); //Get response from player.
      if (response == 0) { // Pick up card
        //CardFuncs.deal();  
        return GAME_CONTINUE;
      }
      else if (response == 1) {
        if(/*Selected pair of cards has matching value*/){
          //GameFuncs.move(cards, stack);
          if(checkWinConditions()){
            return GAME_WIN;
          }
          else return GAME_CONTINUE;
        }
        else{
          //Game.sendInformational("Pair is not matching.");
        }
      }
      else if (response == 2 && !actionCompleted) {
        await selectedCard();
        //CardFuncs.swap(selectedCard);
        //actionCompleted = true;
      }
      else if (response == 3 && !actionCompleted) {
        await selectedPlayer();
        await selectedValue();
        if(selectedPlayer.hasCardValue(selectedValue)){
          //CardFuncs.move(card, player);
          await selectedCardToSwap();
          //CardFuncs.move(selectedCardToSwap);
          //
        }
      }
    }
  }
}
