import { Candidate } from './candidate.js'
import { ButtonMessage, ComputerMessage } from './frame.js'
import { TestResult } from './test_result.js'
import { NumberVariable } from './variable.js'
import { Button, Form, Input, Paragraph } from './html.js'
import { HumanMessage } from './frame.js'

export abstract class Methodology {
    public abstract name(): string
    public abstract showBasicDefinition(): void
    public abstract showExample(callback: () => void): void
    public abstract showWelcomeMessage(): void
    public abstract showPanelsOnMenu(specification: string, currentCandidate: Candidate, previousCandidate: Candidate|undefined, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void
    public abstract showHintMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltyHint: number): void
    public abstract showNoHintMessage(penaltyHint: number): void
    public abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, penaltySubmitWithBug: number): void
    public abstract showUnsuccessfulEndMessage(score: number): void
    public abstract showSuccessfulEndMessage(score: number): void
    public abstract showUselessUnitTestMessage(): void
    public abstract showUsefulUnitTestMessage(): void

    public getExampleSeen(storage: Storage): boolean {
        return storage.getItem(this.name()) === 'true'
    }

    public setExampleSeen(storage: Storage): void {
        storage.setItem(this.name(), 'true')
    }

    public showIncorrectUnitTestMessage(penaltyIncorrectUnitTest: number): void {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add()
        new ComputerMessage([`The cost for trying to add an incorrect unit test is ${penaltyIncorrectUnitTest}%.`]).add()
    }

    public showMinimumScoreEndMessage(score: number): void {
        new ComputerMessage([
            'You have to retry this level, ' +
            `because your score dropped to ${score}%.`,
        ]).add()
    }

    protected showFormUnitTestMessage(valueA: string, valueB: string, valueDivide: string, callback: () => void): void {
        const parameterA = new NumberVariable('a', 'a').setValue(valueA).setReadonly().toHtml()
        const parameterB = new NumberVariable('b', 'b').setValue(valueB).setReadonly().toHtml()
        const unit = new NumberVariable('a / b', 'divide').setValue(valueDivide).setReadonly().toHtml()
        const submitButton = new Input().setType('submit').setValue('I want to add this unit test')
        const cancelButton = new Button()
            .setDisabled()
            .setTitle('I don\'t want to add a unit test now')
            .appendText('Cancel')
            .addClass('cancel')
        const buttonBlock = new Paragraph().appendChildren([submitButton, cancelButton])
        new HumanMessage([
            new Form()
                .onSubmit((event: Event) => { 
                    event.preventDefault()
                    new HumanMessage([
                        'I want to add the following unit test.',
                        `divide(${valueA}, ${valueB}) === ${valueDivide}`,
                    ]).replace()
                    callback()
                })
                .appendChildren([parameterA, parameterB, unit, buttonBlock]),
        ]).add()
    }    
}
