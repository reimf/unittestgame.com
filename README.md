# UnitTestGame.com

## Wishlist
[ ] Store achievements

## State Diagram
```mermaid
stateDiagram-v2
    [*] --> Main.start()
    Main.start() --> Main.themeMenu()
    Main.restart() --> Main.themeMenu()
    Main.themeMenu() --> Main.themeAnswer()
    Main.themeAnswer() --> Main.gameMenu()
    Main.gameMenu() --> Main.gameAnswer()
    Main.gameAnswer() --> Game.play()
    Main.gameMenu() --> Main.anotherTheme()
    Main.anotherTheme() --> Main.themeMenu()
    Game.play() --> Game.menu()
    Game.menu() --> Game.showUnitTestForm()
    Game.menu() --> Game.showHint()
    Game.menu() --> Game.submit()
    Game.menu() --> Game.end()
    Game.showUnitTestForm() --> Game.addUnitTest()
    Game.showUnitTestForm() --> Game.cancelUnitTestForm()
    Game.cancelUnitTestForm() --> Game.menu()
    Game.addUnitTest() --> Game.menu()
    Game.showHint() --> Game.menu()
    Game.submit() --> Game.menu()
    Game.submit() --> Game.end()
    Game.end() --> Main.restart()
```
