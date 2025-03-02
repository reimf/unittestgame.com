# UnitTestGame.com

## Class Diagram
```mermaid
classDiagram

class Main {
    +instance: Main$
    +start() void
    -showNextLevel() void
    -playLevel() void
    +continue() void
}

class Level {
    <<Abstract>>
    +play() void
    -menu() void
    -showFormUnitTest() void
    -addUnitTest() void
    -showHint() void
    -submit() void
    -end() void
}

class Candidate {
    -function: Function
    -complexity: number
    -code: string
    +execute() any
    +testResults() TestResult[]
    +failingTestResults() TestResult[]
    +failCount() number
    +toString() string
}

class TestResult {
    -result: any
    +passes: boolean
    +unitTest: UnitTest
    +toString() string
}

class UnitTest {
    +argumentList: any[]
    +expected: any
    +toString() string
}

class Variable {
    <<Abstract>>
    +name: string
    +value() string | number | boolean
    +toHtml() Html
}

Level "1" <--> "*" Candidate
Level "1" <--> "*" UnitTest
UnitTest "1" <--> "*" TestResult
UnitTest "1" <--> "*" Variable
Candidate "1" <--> "*" TestResult
Level "1" <--> "*" Variable
Main "1" <--> "*" Level
```

## State Diagram
```mermaid
stateDiagram-v2
    [*] --> Main.start
    Main.start --> Main.showNextLevel
    Main.showNextLevel --> Main.playLevel
    Main.playLevel --> Level.play
    Main.continue --> Main.showNextLevel
    Main.continue --> [*]
    Level.play --> Level.menu
    Level.menu --> Level.showUnitTestForm
    Level.menu --> Level.showHint
    Level.menu --> Level.submit
    Level.menu --> Level.end
    Level.showUnitTestForm --> Level.addUnitTest
    Level.showUnitTestForm --> Level.menu
    Level.addUnitTest --> Level.menu
    Level.showHint --> Level.menu
    Level.submit --> Level.menu
    Level.submit --> Level.end
    Level.end --> Main.continue
```
