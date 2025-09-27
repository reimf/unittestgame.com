export class Highlighter {
    start() {
        this.loadHighlightFiles().then(() => {
            new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        const codeBlocks = node.querySelectorAll('code');
                        codeBlocks.forEach(codeBlock => this.highlightCodeBlock(codeBlock));
                    });
                });
            }).observe(document.getElementById('panels'), { childList: true });
        });
    }
    highlightCodeBlock(codeBlock) {
        const hljs = window.hljs;
        hljs.highlightElement(codeBlock);
        codeBlock.innerHTML = codeBlock.innerHTML.split('\n').map(line => {
            const match = line.match(/<span class="hljs-comment">\/\/\s*(\w+)<\/span>/);
            if (!match)
                return `<div>${line}</div>`;
            return `<div class="${match[1]}">${line.replace(match[0], '')}</div>`;
        }).join('');
    }
    async loadHighlightFiles() {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = './libs/highlight.js/11.11.1/styles/github-light.min.css';
        document.head.appendChild(cssLink);
        await this.loadScript('./libs/highlight.js/11.11.1/highlight.min.js');
        await this.loadScript('./libs/highlight.js/11.11.1/languages/javascript.min.js');
    }
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    }
}
