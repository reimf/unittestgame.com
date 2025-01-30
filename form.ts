class Form {
    private variables: Variable[]
    private callback: Function

    public constructor(variables: Variable[], callback: Function) {
        this.variables = variables
        this.callback = callback
    }

    public toHtml() {
        const callbackProxy = (event: Event) => {
            event.preventDefault()
            const target = event.target as HTMLElement
            const section = target.closest('section') as HTMLElement
            const values = this.variables.map(variable => {
                const input = section.querySelector(`input[name="${variable.name}"]`) as HTMLInputElement
                input.disabled = true
                return variable.value(input)
            })
            const button = section.querySelector('input[type="submit"]') as HTMLInputElement
            button.remove()
            this.callback(...values)
        }
        const inputs = this.variables.map(variable => variable.toHtml())
        const button = new Html('input').type('submit').value('Go!')
        const block = new Html('div').appendChild(button)
        return new Html('form').onSubmit(callbackProxy).appendChildren(inputs).appendChild(block)
    }
}
