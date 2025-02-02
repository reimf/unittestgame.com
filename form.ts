class Form extends Html {
    public constructor(variables: Variable[], buttonText: string, callback: Function) {
        super('form')
        const callbackProxy = (event: Event) => {
            event.preventDefault()
            const target = event.target as HTMLElement
            const section = target.closest('section') as HTMLElement
            const values = variables.map(variable => {
                const input = section.querySelector(`input[name="${variable.name}"]`) as HTMLInputElement
                input.disabled = true
                return variable.value(input)
            })
            const button = section.querySelector('input[type="submit"]') as HTMLInputElement
            button.remove()
            callback(...values)
        }
        const inputs = variables.map(variable => variable.toHtml())
        const button = new Input().type('submit').value(buttonText)
        const block = new Div().appendChild(button)
        this.on('submit', callbackProxy).appendChildren(inputs).appendChild(block)
    }
}
