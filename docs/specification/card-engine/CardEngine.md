# Card Engine

## Description

An interface for implementing player and card functionality.

## Objects

In order to simulate a card game, we require the following objects:
- CardEngine
- GameRoom
- Game
- Player
- Card
- CardStack
- GameRules

### CardEngine
The CardEngine object has the following definition.
```csharp
class CardEngine {
  int move(Card sourceCard, CardStack targetStack);
  int swap(Card sourceCard, Card targetCard);
  int deal(CardStack stack, int numberOfCards, Player reciever);
}
```

- *move* transfers a card *sourceCard* to a card stack *targetStack*.
- *swap* moves the card *sourceCard* to the location of *targetCard* and conversely transfers *targetCard* to the original location of *sourceCard*.
- deal is a specialised version of *move* which transfers *numberOfCards* number of cards from the card stack *stack* to the player *receiver*.

### GameRoom
The GameRoom object has the following definition.
```csharp
class GameRoom {
  int id;
  Player[] activePlayers;
  Game game;
}
```

- *id* is a uniquely defined integer which references the game room.
- *activePlayers* is an array of players who are actively playing in the game room.
- *game* is the instance of the current game being played in the game room.

### Game
The Game object has the following definition.
```csharp
class Game {
  GameRules gameRules;
  int start();
  int init();
  int turn();
  int next();
  int end();
}
```

- *start* is a function which starts the game.
- *init* is a function which initialises the player order, player cards and table setup.
- *turn* is a function that implements the current game rules *gameRules* for the player.
- *next* is a function that handles the passing of a turn.
- *end* is a function that stops the game.

### Player
The Player object has the following definition.
```csharp
class Player {
  string username;
  int score;
  int getCards(CardStack targetStack, int numberOfCards);
  int removeCards(Card[] sourceCards, CardStack targetStack);
  int swapCard(Card sourceCard, Card targetCard);
  int moveCard(Card sourceCard, CardStack targetStack);
}
```

- *username* is the current player's username.
- *score* is the total number of points earned for the current game room.
- *getCards* is a function that takes *numberOfCards* number of cards from the stack *targetStack*.
- *removeCards* is a function that removes all *sourceCards* and moves them to the stack *targetStack*.
- *swapCard* is a function that swaps the player's *sourceCard* with another player's *targetCard*.
- *moveCard* is a function that moves a player's *sourceCard* to a stack *targetStack*.


### Card
The Card object has the following definition.
```csharp
class Card {
  int value;
  char suit;
  bool isHidden;
}
```

- *value* is the reference to the card's value (Ace = 1, Seven = 7, Ten = 10, Queen = 12, etc).
- *suit* is a char representing the suit of the card ('c' = Clubs, 'd' = Diamonds, 's' = Spades, 'h' = Hearts).
- *isHidden* is a boolean that represents whether the card is face up or down (false/true).

### CardStack
The CardStack object has the following definition.
```csharp
class CardStack {
  Card[] stack;
  int minimumNumberOfCards;
  int maximumNumberOfCards;
  int take();
}
```

- *stack* is the representation of the card stack as an array of *Card*.
- *minimumNumberOfCards* is an integer representing the minimum number of cards that must be present in the stack.
- *maximumNumberOfCards* is an integer representing the maximum number of cards that can be in the stack.
- *take* is a function.

### GameRules

```csharp
interface GameRules {
  int init();
  int turn();
  int checkWinConditions();
}
```

- *init* is the implementation of how the game should be initialised.
- *turn* is the implementation of how the turn should progress.
- *checkWinConditions* is a function that determines if a win is achieved.

## System Architecture Diagram

A flow diagram representing the architecture of the card engine. 
![Engine Architecture](./CardEngineDiagram.png "Card Engine Diagram")

## Multiplayer Implementation Strategy
Though this card engine will be implemented client side for single player, it will be implemented on the server for
multiplayer in order to ensure that the actions of players are tracked accordingly. For that, a separate system will
need to be implemented so it is adapted for multiplayer connection and synchronised for all connecting clients. However, that will be revised in the Multiplayer Implementation iteration. That being said, the structure of the card engine has been decided with the thought of later implementation of networking in mind.
