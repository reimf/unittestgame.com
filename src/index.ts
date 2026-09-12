document.addEventListener('DOMContentLoaded', () => {
    const steps = [
        'i-want-to-add-this-unit-test-18-true',
        'this-is-you',
        'with-your-first-unit-test',
        'function-isallowedtovote-return-true',
        'this-is-the-ai-bot',
        'its-first-function-passes-your-unit-test',
        'but-it-doesnt-generalize',
        'i-want-to-add-this-unit-test-17-false',
        'this-is-you-again',
        'now-with-your-second-unit-test',
        'function-isallowedtovote-if-age-gte-18-return-true-return-false',
        'this-is-the-ai-bot-again',
        'its-second-function-passes-both-unit-tests',
        'and-now-it-generalizes',
    ].map(id => document.getElementById(id)!)
    const ICONS = {
        play:   '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M7,4 L19,12 L7,20 Z"/></svg>',
        pause:  '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6,4 h3 v16 h-3 z M15,4 h3 v16 h-3 z"/></svg>',
        replay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16,9.3 h5 v0 M3,19.6 v-5 m0,0 h5 m-5,0 3.2,3.2 a8.3,8.3 0 0 0 13.8,-3.7 M4,9.9 a8.3,8.3 0 0 1 13.8,-3.7 l3.2,3.2 m0,-5 v5"/></svg>',
    }

    const controlAnimationButton = document.getElementById('control-animation') as HTMLButtonElement
    const progressElement = document.getElementById('progress') as HTMLProgressElement

    const maxStep = steps.length - 1
    const STEP_DURATION = 3000
    let playing: number | null = null
    let stepStart = 0

    // One phase per message reveal, plus a trailing phase held after the last message.
    const phaseCount = steps.length + 1
    progressElement.max = phaseCount

    const isFinished = (): boolean => progressElement.value === phaseCount

    // currentStep and elapsed-in-phase are both derivable from progressElement.value,
    // so it's the single source of truth instead of parallel state kept in sync by hand.
    const stepForValue = (value: number): number =>
        Math.min(Math.max(Math.floor(value) - 1, -1), maxStep)

    const render = (): void => {
        const step = stepForValue(progressElement.value)
        steps.forEach((_, index) =>
            steps[index]!.classList.toggle('visible', index <= step)
        )
        progressElement.classList.remove('playing')
        controlAnimationButton.innerHTML = isFinished() ? ICONS.replay : playing !== null ? ICONS.pause : ICONS.play
    }

    const goToStep = (index: number): void => {
        progressElement.value = index + 1
        render()
    }

    const stopAutoplay = (): void => {
        if (playing !== null) window.cancelAnimationFrame(playing)
        playing = null
        render()
    }

    const startAutoplay = (): void => {
        render()
        progressElement.classList.add('playing')
        controlAnimationButton.innerHTML = ICONS.pause
        const elapsed = (progressElement.value - Math.floor(progressElement.value)) * STEP_DURATION
        stepStart = performance.now() - elapsed

        const tick = (time: number): void => {
            const step = stepForValue(progressElement.value)
            const fraction = Math.min((time - stepStart) / STEP_DURATION, 1)
            progressElement.value = step + 1 + fraction
            if (fraction >= 1) {
                if (step === maxStep) {
                    stopAutoplay()
                    return
                }
                stepStart = time
                steps[step + 1]?.classList.add('visible')
            }
            playing = window.requestAnimationFrame(tick)
        }

        playing = window.requestAnimationFrame(tick)
    }

    controlAnimationButton.addEventListener('click', () => {
        if (playing !== null) {
            stopAutoplay()
            return
        }
        if (isFinished())
            goToStep(-1)
        startAutoplay()
    })

    const seekTo = (clientX: number): void => {
        const { left, width } = progressElement.getBoundingClientRect()
        const ratio = Math.min(Math.max((clientX - left) / width, 0), 1)
        progressElement.value = ratio * phaseCount
        render()
    }

    progressElement.addEventListener('pointerdown', event => {
        stopAutoplay()
        progressElement.classList.add('seeking')
        progressElement.setPointerCapture(event.pointerId)
        seekTo(event.clientX)
    })

    progressElement.addEventListener('pointermove', event => {
        if (event.buttons !== 0)
            seekTo(event.clientX)
    })

    const stopSeeking = (event: PointerEvent): void => {
        progressElement.classList.remove('seeking')
        progressElement.releasePointerCapture(event.pointerId)
    }

    progressElement.addEventListener('pointerup', stopSeeking)
    progressElement.addEventListener('pointercancel', stopSeeking)

    startAutoplay()
})
