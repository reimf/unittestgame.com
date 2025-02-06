UnitTestGame.com
================

[ ] After end back to beginning
[ ] Store achievements

```mermaid
stateDiagram-v2
    [*] --> Main.start()
    state Main {
        Main.start() --> Main.themeMenu()
        Main.themeMenu() --> Main.themeAnswer()
        Main.themeAnswer() --> Main.gameMenu()
        Main.gameMenu() --> Main.gameAnswer()
        Main.gameAnswer() --> Game.play()
        Main.themeMenu() --> Main.end()
        Main.gameMenu() --> Main.end()
        Main.end() --> [*]
    }
    state Game {
        Game.play() --> Game.menu()
        Game.menu() --> Game.showUnitTestForm()
        Game.menu() --> Game.showHint()
        Game.menu() --> Game.submit()
        Game.menu() --> Game.end()
        Game.showUnitTestForm() --> Game.addUnitTest()
        Game.addUnitTest() --> Game.menu()
        Game.showHint() --> Game.menu()
        Game.submit() --> Game.menu()
        Game.submit() --> Game.end()
        Game.end() --> [*]
    }
```
