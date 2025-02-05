class Form extends Html {
    public constructor(private variables: Variable[], submitButtonText: string, private callbackSubmit: (event: Event) => void, cancelButtonText: string, callbackCancel: (event: Event) => void) {
        super('form')
        const inputs = variables.map(variable => variable.toHtml())
        const submitButton = new Input('submit').value(submitButtonText)
        const cancelButton = new Button(cancelButtonText, event => callbackCancel(event))
        const buttonBlock = new Div().appendChildren([submitButton, cancelButton])
        this.appendChildren(inputs).appendChild(buttonBlock).on('submit', event => this.callbackSubmit(event))
    }
}
