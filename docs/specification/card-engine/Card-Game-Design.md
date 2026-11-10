# Card Game Design

## Creating a Card Game
1. In the ~/games directory, create a JavaScript file that inherits from GameRules.
2. Setup the JavaScript file in accordance to the GameRules structure, ensuring to define the name of the Game as the title member variable.
3. Inside of turn, define the player logic both active and inactive for a player turn and define the initial setup of the game.
4. The game loader script will load your file as part of the playable games and as long as there are no issues with the code, the game will run and be rendered by the rendering engine.

## Creating the turn system
1. Store the user id in the browser.
2. Check if the current player id matches the browser id.
3. If so, activate controls. (Use setTimeout to ensure this functionality works as expected.)
4. If not, deactivate controls.
