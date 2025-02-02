class Form extends Html {
    public constructor(private variables: Variable[], buttonText: string, private callback: Function) {
        super('form')
        const inputs = variables.map(variable => variable.toHtml())
        const button = new Input().type('submit').value(buttonText)
        const block = new Div().appendChild(button)
        this.on('submit', event => this.submit(event)).appendChildren(inputs).appendChild(block)
    }

    submit(event: Event): void {
        event.preventDefault()
        const target = event.target as HTMLElement
        const section = target.closest('section') as HTMLElement
        const values = this.variables.map(variable => {
            const input = section.querySelector(`input[name="${variable.name}"]`) as HTMLInputElement
            return variable.value(input)
        })
        this.callback(values)
    }
}
