[V] contract weg
[V] specificatie altijd laten zien
[V] thema kiest -> intro -> daarna game
[V] scrollbars
[ ] AI
[V] simple game even/oneven
[V] wachtwoord generator


stateDiagram-v2
    [*] --> Main.start()
    state Main {
        Main.start() --> Main.themeMenu()
        Main.themeMenu() --> Main.themeAnswer()
        Main.themeMenu() --> Main.end()
        Main.themeAnswer() --> Main.gameMenu()
        Main.gameMenu() --> Main.gameAnswer()
        Main.gameMenu() --> Main.end()
        Main.gameAnswer() --> Game.play()
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
