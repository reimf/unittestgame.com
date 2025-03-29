# UnitTestGame.com

Learn to write **effective unit tests** with an interactive game where you collaborate with an AI bot to improve your skills in **Test-Driven Development** and **Mutation Testing**.

Try this AI-powered feedback loop at **<https://unittestgame.com>**.

## 🚀 Test-Driven Development

The goal: **Write a function that meets the given specification.**

### How it works:
1. **You write unit tests** to define the expected behavior of the function.
2. **The AI bot writes a function** that passes the unit tests.
3. **Repeat** until you think the function is correct. 
4. **Submit** the unit tests.
5. **Validation**: The AI bot checks if the function meets the specification.
   - ✅ If correct, you’ve successfully implemented the function!
   - ❌ If incorrect, the AI bot shows **a valid unit test** that the function fails.

---

## 🧪 Mutation Testing

The goal: **Test a function thoroughly.**

### How it works:
1. **You write unit tests** to fully cover the function.
2. **The AI bot highlights covered lines** in the function.
3. **Repeat** until you think the unit tests fully cover the function.
3. **Submit** the unit tests.
4. **Validation**: The AI bot checks the function with Mutation Testing.
   - ✅ If correct, you've fully tested the function!
   - ❌ If incorrect, the AI bot generates **a mutated version** of the function that passes the unit tests.

---

Feedback? Errors? Improvements?
Mail me at <feedback@unittestgame.com>.

# Flowcharts

## Main

```mermaid
flowchart TD
    subgraph Main.start
        Main.showWelcomeMessage -- has no level with high score --> Main.showQuestionSidebar
    end
    Main.showQuestionSidebar --> Main.sidebar
    Main.showWelcomeMessage -- has level with high score --> Main.sidebar

    subgraph Main.sidebar
        Main.showUnittestgamePanel --> Methodology.showBasicDefinition
    end
    Methodology.showBasicDefinition --> Main.continue

    subgraph Main.continue
        Main.showHighScoresPanel --> Main.showInvitationMessage
        Main.showInvitationMessage --> Main.showNextLevel
    end
    Main.showNextLevel -- has next level --> Main.play
    Main.showNextLevel -- has no next level --> window.close

    subgraph Main.play
        Panel.removeAll --> Level.play
    end
    Level.play --> Main.continue
```

## Level

```mermaid
flowchart TD
    subgraph Level.play
        Level.showWelcomeMessage
    end
    Level.showWelcomeMessage --> Level.menu

    subgraph Level.menu
         Methodology.showPanelsOnMenu --> Level.showUnitTestsPanel
         Level.showUnitTestsPanel --> Level.showScorePanel
         Level.showScorePanel -- score > 0 --> Level.showMenuMessage
    end
    Level.showScorePanel -- score == 0 --> Level.end
    Level.showMenuMessage --> Level.startAddUnitTestFlow
    Level.showMenuMessage --> Level.showHint
    Level.showMenuMessage --> Level.prepareSubmitUnitTests
    Level.showMenuMessage --> Level.end

    subgraph Level.startAddUnitTestFlow
         Level.showConfirmStartUnitTestFlowMessage --> Level.showFormUnitTestMessage
    end
    Level.showFormUnitTestMessage --> Level.cancelAddUnitTestFlow
    Level.showFormUnitTestMessage --> Level.prepareAddUnitTest

    subgraph Level.cancelAddUnitTestFlow
         Level.showConfirmCancelAddUnitTestFlowMessage
    end
    Level.showConfirmCancelAddUnitTestFlowMessage --> Level.menu

    subgraph Level.prepareAddUnitTest
         Level.showAddUnitTestMessage --> Level.showProcessing
    end
         Level.showProcessing --> Level.addUnitTest

    subgraph Level.addUnitTest
         X1@{ shape: circle, label: "Start" }
         X1 -- unit test is correct and useless --> Methodology.showUselessUnitTestMessage
         X1 -- unit test is correct and useful --> Methodology.showUsefulUnitTestMessage
         X1 -- unit test is not correct --> Methodology.showIncorrectUnitTestMessage
    end
    Methodology.showUselessUnitTestMessage --> Level.menu
    Methodology.showUsefulUnitTestMessage --> Level.menu
    Methodology.showIncorrectUnitTestMessage --> Level.menu

    subgraph Level.showHint
         X2@{ shape: circle, label: "Start" }
         X2 -- has hint --> Methodology.showHintMessage
         X2 -- has no hint --> Methodology.showNoHintMessage
    end
    Methodology.showHintMessage --> Level.menu
    Methodology.showNoHintMessage --> Level.menu

    subgraph Level.prepareSubmitUnitTests
         X3@{ shape: rect, label: "Level.showProcessing" }
    end
    X3 --> Level.submitUnitTests

    subgraph Level.submitUnitTests
         X4@{ shape: circle, label: "Start" }
         X4 -- not ok --> Methodology.showBugFoundMessage
    end
    X4 -- ok --> Level.end
    Methodology.showBugFoundMessage --> Level.menu

    subgraph Level.end
         X4@{ shape: circle, label: "Start" }
         X4 -- score == 0 --> Methodology.showMinimumScoreEndMessage
         X4 -- not ok --> Level.showScorePanel2
         Level.showScorePanel2 --> Methodology.showUnsuccessfulEndMessage
         X4 -- score > 0 --> Methodology.showSuccessfulEndMessage
    end
    Methodology.showMinimumScoreEndMessage --> Main.continue
    Methodology.showUnsuccessfulEndMessage --> Main.continue
    Methodology.showSuccessfulEndMessage --> Main.continue
```