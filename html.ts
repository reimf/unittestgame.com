class Html {
    private element: HTMLElement

    public constructor(tagName: string) {
        this.element = document.createElement(tagName)
    }

    public id(id: string): Html {
        this.element.id = id
        return this
    }

    public href(value: string): Html {
        (this.element as HTMLAnchorElement).href = value
        return this
    }

    public type(value: string): Html {
        (this.element as HTMLInputElement).type = value
        return this
    }

    public name(value: string): Html {
        (this.element as HTMLInputElement).name = value
        return this
    }

    public accessKey(value: string): Html {
        (this.element as HTMLInputElement).accessKey = value[0]
        return this
    }

    public value(value: string): Html {
        (this.element as HTMLInputElement).value = value
        return this
    }

    public autocomplete(value: 'on' | 'off'): Html {
        (this.element as HTMLInputElement).autocomplete = value
        return this
    }

    public addClass(value?: string): Html {
        if (value)
            this.element.classList.add(value)
        return this
    }

    public appendText(value: string): Html {
        this.element.appendChild(document.createTextNode(value))
        return this
    }

    public appendChild(value: Html): Html {
        this.element.appendChild(value.element)
        return this
    }

    public appendChildren(values: Html[]): Html {
        for (const value of values)
            this.element.appendChild(value.element)
        return this
    }

    public onSubmit(callback: (event: Event) => void): Html {
        this.element.addEventListener('submit', callback)
        return this
    }

    public addTo(parentId: string): void {
        const old = document.querySelector('#' + this.element.id)
        if (old) 
            old.replaceWith(this.element)
        else
            document.querySelector('#' + parentId)!.appendChild(this.element)
        this.element.querySelector('input')?.focus()
    }
}

class Header extends Html {
    public constructor(text: string) {
        super('header')
        this.appendText(text)
    }
}

class Paragraph extends Html{
    public constructor(text: string) {
        super('p')
        this.appendText(text)
    }
}
