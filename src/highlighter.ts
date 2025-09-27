export class Highlighter {
    public start(): void {
        this.loadHighlightFiles().then(() => {
            new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        const codeBlocks = (node as Element).querySelectorAll('code')
                        codeBlocks.forEach(codeBlock => this.highlightCodeBlock(codeBlock))
                    })
                })
            }).observe(document.getElementById('panels')!, { childList: true })
        })
    }

    private highlightCodeBlock(codeBlock: HTMLElement): void {
        const hljs = (window as any).hljs
        hljs.highlightElement(codeBlock)
        codeBlock.innerHTML = codeBlock.innerHTML.split('\n').map(line => {
            const match = line.match(/<span class="hljs-comment">\/\/\s*(\w+)<\/span>/)
            if (!match)
                return `<div>${line}</div>`
            return `<div class="${match[1]}">${line.replace(match[0], '')}</div>`
        }).join('')
    }

    private async loadHighlightFiles(): Promise<void> {
        const cssLink = document.createElement('link')
        cssLink.rel = 'stylesheet'
        cssLink.href = './libs/highlight.js/11.11.1/styles/github-light.min.css'
        document.head.appendChild(cssLink)
        await this.loadScript('./libs/highlight.js/11.11.1/highlight.min.js')
        await this.loadScript('./libs/highlight.js/11.11.1/languages/javascript.min.js')
    }

    private loadScript(src: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => resolve()
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
            document.head.appendChild(script)
        })
    }
}
