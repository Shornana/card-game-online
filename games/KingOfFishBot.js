import {Bot} from "../card-engine/Bot.js";

export class KingOfFishBot extends Bot{
  constructor(username, id, hand){
    super(username, id, hand);
  }
  
  findPair(){
    for(let i = 0; i < this.hand.getNumberOfCards() - 1; ++i){
      for(let j = i + 1; j < this.hand.getNumberOfCards(); ++j){
        if(this.getHand()[i].value === this.getHand()[j].value){
          return [i, j];
        }
      }
    }
    return [-1];
  }

  turn(graphics, player, deck, discard){ //Pass player for now until choosing of player happens
    let findPairRes = this.findPair();
    if(findPairRes[1] > 0){ // Will only be more than zero if matches with index 1.
      console.log("Discarded the " + this.getCard(findPairRes[0]).value 
          + this.getCard(findPairRes[0]).suit 
          + " and the " +  this.getCard(findPairRes[1]).value 
          + this.getCard(findPairRes[1]).suit
      );
      this.sendCard(findPairRes[1], discard); 
      this.sendCard(findPairRes[0], discard);
      graphics.renderGraphics();
      return 0;
    }
  
    //If not, does bot have a card they know we have? (Will have to do normal swapping first)
   // for(const card of botKnownCards){
   //   console.log(card);
   //   for(let i = 0; i < bot.hand.getNumberOfCards(); ++i ){
   //     if(card.value === bot.getCard(i).value){
   //       setTimeout(()=> {
   //         const player_index = player.getHand().indexOf(card);
   //         botKnownCards.splice(botKnownCards.indexOf(card), 1); //Remove from known cards.
   //         player.sendCard(player_index, discard);
   //         bot.sendCard(i, discard);
   //         bot.sendCard(0, player);
   //         refreshPageElements();
   //         console.log("Used hard swap!");
   //       }, 2000);
   //       return 0;
   //     }
   //   }
   // }
      //REQUIRES KNOWN CARDS WHICH HASN'T BEEN MADE IN OOP MODEL YET.

    //Attempt to swap with player? Let's be dumb and use a random swap.
    const randomNumber = Math.random();
    if(randomNumber > 0.5){ //Hopefully 50/50 chance of soft swap.
      const randomPlayerIndex = Math.floor(Math.random() * (player.hand.getNumberOfCards()));
      const randomBotIndex = Math.floor(Math.random() * (this.hand.getNumberOfCards()));
      console.log("Swapping Bot's Card " + this.getCard(randomBotIndex).value + " with Player's " + player.getCard(randomPlayerIndex).value);
      //if(botKnownCards.includes(player.getCard(randomPlayerIndex))) {botKnownCards.splice(botKnownCards.indexOf(player.getCard(randomPlayerIndex)) ,1);}
      //botKnownCards.push(bot.getCard(randomBotIndex));
      this.swapCard(randomBotIndex, player, randomPlayerIndex);
      graphics.renderGraphics();

      findPairRes = this.findPair();
      if(findPairRes[1] > 0){ // Will only be more than zero if matches with index 1.
        console.log("Discarded the " + this.getCard(findPairRes[0]).value 
          + this.getCard(findPairRes[0]).suit 
          + " and the " +  this.getCard(findPairRes[1]).value 
          + this.getCard(findPairRes[1]).suit
        );
        this.sendCard(findPairRes[1], discard); 
        this.sendCard(findPairRes[0], discard);
        graphics.renderGraphics();
        return 0;
      }
    }
    //Deal card to bot.
    deck.deal(this, 1);
    graphics.renderGraphics();
    return 0;
  }
}
