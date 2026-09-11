document.addEventListener('DOMContentLoaded', () => {
    const stepIds = [
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
    const ICONS = {
        play:   '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M7,4 L19,12 L7,20 Z"/></svg>',
        pause:  '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6,4 h3 v16 h-3 z M15,4 h3 v16 h-3 z"/></svg>',
        replay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16,9.3 h5 v0 M3,19.6 v-5 m0,0 h5 m-5,0 3.2,3.2 a8.3,8.3 0 0 0 13.8,-3.7 M4,9.9 a8.3,8.3 0 0 1 13.8,-3.7 l3.2,3.2 m0,-5 v5"/></svg>',
    }

    const controlAnimationButton = document.getElementById('control-animation')
    const progressElement = document.getElementById('progress') as HTMLProgressElement | null

    if (controlAnimationButton && progressElement) {
        const steps = stepIds.map(id => document.getElementById(id)!)
        const maxStep = steps.length - 1
        const STEP_DURATION = 3000
        let currentStep = 0
        let playing: number | null = null
        let elapsed = 0
        let stepStart = 0

        progressElement.max = steps.length

        const render = (): void => {
            steps.forEach((_, index) => {
                steps[index]!.classList.toggle('visible', index <= currentStep)
            })
            progressElement.classList.remove('playing')
            controlAnimationButton.innerHTML = currentStep === maxStep ? ICONS.replay : playing !== null ? ICONS.pause : ICONS.play
        }

        const goToStep = (index: number): void => {
            currentStep = index
            elapsed = 0
            progressElement.value = currentStep + 1
            render()
        }

        const stopAutoplay = (): void => {
            if (playing !== null) {
                window.cancelAnimationFrame(playing)
                elapsed = Math.min(elapsed + (performance.now() - stepStart), STEP_DURATION)
            }
            playing = null
            render()
        }

        const startAutoplay = (): void => {
            render()
            progressElement.classList.add('playing')
            controlAnimationButton.innerHTML = ICONS.pause
            stepStart = performance.now() - elapsed
            progressElement.value = currentStep + 1 + elapsed / STEP_DURATION

            const tick = (time: number): void => {
                const fraction = Math.min((time - stepStart) / STEP_DURATION, 1)
                progressElement.value = currentStep + 1 + fraction
                if (fraction >= 1) {
                    currentStep += 1
                    elapsed = 0
                    stepStart = time
                    steps[currentStep]?.classList.add('visible')
                    if (currentStep === maxStep) {
                        stopAutoplay()
                        return
                    }
                }
                playing = window.requestAnimationFrame(tick)
            }

            playing = window.requestAnimationFrame(tick)
        }

        controlAnimationButton.addEventListener('click', () => {
            if (currentStep === maxStep) {
                goToStep(0)
                startAutoplay()
            } else if (playing !== null)
                stopAutoplay()
            else
                startAutoplay()
        })

        progressElement.addEventListener('click', event => {
            const { left, width } = progressElement.getBoundingClientRect()
            const ratio = Math.min(Math.max((event.clientX - left) / width, 0), 1)
            const exactValue = ratio * steps.length
            stopAutoplay()
            currentStep = Math.min(Math.max(Math.floor(exactValue) - 1, -1), maxStep)
            elapsed = 0
            progressElement.value = exactValue
            render()
        })

        startAutoplay()
    } else {
        const steps = [...stepIds]
        const playing = window.setInterval(() => {
            document.getElementById(steps.shift()!)!.classList.add('visible')
            if (steps.length === 0)
                window.clearInterval(playing)
        }, 3000)
    }
})
