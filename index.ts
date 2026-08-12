document.addEventListener('DOMContentLoaded', () => {
    const steps = [
        'message-1',
        'this-is-you',
        'first-unit-test',
        'message-2',
        'this-is-the-ai-bot',
        'first-function',
        'first-verdict',
        'message-3',
        'this-is-you-again',
        'second-unit-test',
        'message-4',
        'this-is-the-ai-bot-again',
        'second-function',
        'second-verdict',
    ]
    const playing = window.setInterval(() => {
        document.getElementById(steps.shift()!)!.classList.add('visible')
        if (steps.length === 0)
            window.clearInterval(playing)
    }, 3000)
})
