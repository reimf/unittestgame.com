const steps = [
    'message-1',
    'this-is-you',
    'first-unit-test',
    'message-2',
    'this-is-the-ai-bot',
    'first-function',
    'first-verdict',
    'message-3',
    'second-unit-test',
    'message-4',
    'second-function',
    'second-verdict',
].map(id => document.getElementById(id)!)
const maxStep = steps.length - 1
const dotsContainer = document.getElementById('dots')!
const controlAnimationButton = document.getElementById('control-animation')!
let currentStep = 0
let playing: number | null = null

const dots = steps.map((_, index) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.className = 'dot'
    dot.setAttribute('aria-label', `Go to step ${index + 1}`)
    dot.addEventListener('click', () => {
        stopAutoplay()
        goToStep(index)
    })
    dotsContainer.append(dot)
    return dot
})

function render(): void {
    steps.forEach((_, index) => {
        steps[index]!.classList.toggle('visible', index <= currentStep)
        dots[index]!.classList.toggle('filled', index <= currentStep)
    })
    controlAnimationButton.textContent = currentStep === maxStep ? '⟲' : playing ? '⏸' : '⇥'
}

function goToStep(index: number): void {
    currentStep = index
    render()
}

function stopAutoplay(): void {
    if (playing !== null)
        window.clearInterval(playing)
    playing = null
    render()
}

function startAutoplay(): void {
    playing = window.setInterval(() => {
        goToStep(currentStep + 1)
        if (currentStep === maxStep)
            stopAutoplay()
    }, 4000) as unknown as number
    render()
}

controlAnimationButton.addEventListener('click', () => {
    if (currentStep === maxStep)
        goToStep(0)
    else if (playing !== null)
        stopAutoplay()
    else
        goToStep(currentStep + 1)
})

startAutoplay()
