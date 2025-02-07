# UnitTestGame.com

## Wishlist
[ ] Store achievements (e.g. in cookie or local storage)

## State Diagram
```mermaid
stateDiagram-v2
    [*] --> Main.start
    Main.start --> Main.themeMenu
    Main.themeMenu --> Main.gameMenu
    Main.gameMenu --> Game.play
    Game.play --> Game.menu
    Game.menu --> Game.showUnitTestForm
    Game.menu --> Game.showHint
    Game.menu --> Game.submit
    Game.menu --> Game.end
    Game.showUnitTestForm --> Game.addUnitTest
    Game.showUnitTestForm --> Game.menu
    Game.addUnitTest --> Game.menu
    Game.showHint --> Game.menu
    Game.submit --> Game.menu
    Game.submit --> Game.end
    Game.end --> Main.start
```
