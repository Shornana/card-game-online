# Card Engine

## Description

An interface for implementing player and card functionality.

## Objects

In order to simulate a card game, we require the following objects:
- GameRoom
- Game
- Player
- Card
- CardStack

### GameRoom
The GameRoom object has the following definition.
```
class GameRoom {
   int id;
   Player[] activePlayers;
   Game game;
}
```

## Functionality

1. > move(card, target, (opt) origin)
2. > swap(source_card, target_card)
3. > draw(stack)
