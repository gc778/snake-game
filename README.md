# Snake Game

## Controling the snake

You can press start/re-start at any time to start/re-start the game.

On a computer with a keyboard you can control the snake using arrow keys. On a phone or tablet you can control the sanke by tapping on the corners of the screen. For convenience (on a phone or a tablet) there will be foure directional arrows on each side of the screen. 

## Gameplay

Gameplay is simple you will control the snake and try to grow it by consuming apples that would randomply appear on the screen. There will be at most one apple on a screen at a time. You will lose the game if the snake hits one of foure boarders or itself. You will win the game if you can score 100 points. You will earn one point for each apple you consume.

## Walkthrough creation of the snake game.

## HTML Content

- [x] Create full HTML skeleton

  - [x] A game container element, for styling and layout.
  - [x] A button to start the game.
  - [x] A label element containing an output elelemnt to keep track of the score.
  - [x] A canvas element bellow controls where the game will be displayed.
  - [x] Create a start game welcome screen on top of the canvas.

        - [x] In the start screen outline the rules of the game.

## SCSS Layout and styling

- [x] Create full SCSS styling

  - [x] Reset margin and padding for all elements.
  - [x] Game container should have flex-direction: column.
  - [x] Controls container should be on top of game canvas.
  - [x] justify-content: space-between.

## Type Script 

- [x] Learn how to use a canvas element first.

  - [x] Create detection for Start/Restart button.

          - [x] Score need to be updated to 0.
          - [x] Snake should start from some (possibly random) position.
          - [x] Food piece should appear at some (possibly random) position.
          - [x] If game was over (win or loss) then end game screen needs to go away.

  - [x] Create detection for arrow keys.

          - [x] Program the main game logic

  - [x] Create win/loss conditions

          - [x] You lose if you hit a wall or yourself.
          - [x] You win if your score reaches some amount say 100.
          - [x] In either case dispay an end game screen on top of the canvas.

