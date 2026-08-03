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
```csharp
class CardEngine {
  int move();
  int swap();
  int deal();
}
```

### GameRoom
The GameRoom object has the following definition.
```csharp
class GameRoom {
  int id;
  Player[] activePlayers;
  Game game;
}
```

### Game
The Game object has the following definition.
```csharp
class Game {
  int next_turn();
}
```

### Player
The Player object has the following definition.
```csharp
class Player {
  int getCard();
  int removeCard();
  int swapCard();
}
```

### Card
The Card object has the following definition.
```csharp
class Card {
  int value;
  char suit;
  bool isHidden;
}
```

### CardStack
The CardStack object has the following definition.
```csharp
class CardStack {
  Card[] stack;
  int send();
}
```

![Engine Architecture](./CardEngineDiagram.png "Card Engine Diagram")
