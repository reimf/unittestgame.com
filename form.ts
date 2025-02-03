class Form extends Html {
    public constructor(private variables: Variable[], submitButtonText: string, private callbackSubmit: Function, cancelButtonText: string, callbackCancel: Function) {
        super('form')
        const inputs = variables.map(variable => variable.toHtml())
        const submitButton = new Input().type('submit').value(submitButtonText)
        const cancelButton = new Button(cancelButtonText).on('click', event => callbackCancel(event))
        const block = new Div().appendChildren([submitButton, cancelButton])
        this.appendChildren(inputs).appendChild(block).on('submit', event => this.callbackSubmit(event))
    }
}
