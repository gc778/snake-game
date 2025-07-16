# Snake Game

Walkthrough creation of the snake game.

## HTML Content

- [x] Create full HTML skeleton

  - [x] A game container element, for styling and layout.
  - [x] A button to start the game.
  - [x] A label element containing an output elelemnt to keep track of the score.
  - [x] A canvas element bellow controls where the game will be displayed.
  - [] Create a start game welcome screen on top of the canvas.

        - [] In the start screen outline the rules of the game.

## SCSS Layout and styling

- [x] Create full SCSS styling

  - [x] Reset margin and padding for all elements.
  - [x] Game container should have flex-direction: column.
  - [x] Controls container should be on top of game canvas.
  - [x] justify-content: space-between.

## Programming and what to do next

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
          
