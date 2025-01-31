class Form {
    public constructor(
        private variables: Variable[],
        private buttonText: string,
        private callback: Function
    ) { }

    public toHtml() {
        const callbackProxy = (event: Event) => {
            event.preventDefault()
            const target = event.target as HTMLElement
            const section = target.closest('section') as HTMLElement
            const values = this.variables.map(variable => {
                const input = section.querySelector(`input[name="${variable.name}"]`) as HTMLInputElement
                console.log(input)
                input.disabled = true
                return variable.value(input)
            })
            const button = section.querySelector('input[type="submit"]') as HTMLInputElement
            button.remove()
            this.callback(...values)
        }
        const inputs = this.variables.map(variable => variable.toHtml())
        const button = new Html('input').type('submit').value(this.buttonText)
        const block = new Html('div').appendChild(button)
        return new Html('form').on('submit', callbackProxy).appendChildren(inputs).appendChild(block)
    }
}
