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

### CardEngine
The CardEngine object has the following definition.
```
class CardEngine {
  int move();
  int swap();
  int deal();
}
```

### GameRoom
The GameRoom object has the following definition.
```
class GameRoom {
  int id;
  Player[] activePlayers;
  Game game;
}
```

### Game
The Game object has the following definition.
```
class Game {
  int next_turn();
}
```

### Player
The Player object has the following definition.
```
class Player {
  int getCard();
  int removeCard();
  int swapCard();
}
```

### Card
The Card object has the following definition.
```
class Card {
  int value;
  char suit;
  bool isHidden;
}
```

### CardStack
The CardStack object has the following definition.
```
class CardStack {
  Card[] stack;
  int send();
}
```
