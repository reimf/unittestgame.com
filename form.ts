class Form {
    private variables: Variable[]
    private callback: Function

    public constructor(variables: Variable[], callback: Function) {
        this.variables = variables
        this.callback = callback
    }

    public toHtmlElement() {
        const form = document.createElement('form')
        form.addEventListener('submit', event => {
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
        })
        for (const variable of this.variables)
            form.appendChild(variable.toHtmlElement())
        const button = document.createElement('input')
        button.type = 'submit'
        button.innerText = 'Go!'
        form.appendChild(button)
        return form
    }
}
