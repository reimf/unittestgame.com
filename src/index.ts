document.addEventListener('DOMContentLoaded', () => {
    const steps = [
        'you-can-vote-if-your-age-is-18-or-over',
        'function-isallowedtovote-return-false',
        'this-is-the-ai-bot',
        'its-first-function-is-not-correct',
        'i-want-to-add-this-unit-test-18-true',
        'this-is-you',
        'with-your-first-unit-test',
        'function-isallowedtovote-return-true',
        'this-is-the-ai-bot-again',
        'its-second-function-passes-your-unit-test',
        'but-it-is-still-not-correct',
        'i-want-to-add-this-unit-test-17-false',
        'this-is-you-again',
        'now-with-your-second-unit-test',
        'function-isallowedtovote-if-age-gte-18-return-true-return-false',
        'this-is-the-ai-bot-for-the-last-time',
        'its-third-function-passes-both-unit-tests',
        'and-now-it-is-correct',
    ].map(id => document.getElementById(id)!)
    const ICONS = {
        play:   '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M7,4 L19,12 L7,20 Z"/></svg>',
        pause:  '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6,4 h3 v16 h-3 z M15,4 h3 v16 h-3 z"/></svg>',
        replay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3,19.6 v-5 h5 m-5,0 3.2,3.2 a8.3,8.3 0 1 0 -2.2,-8"/></svg>',
    }

    const controlAnimationButton = document.getElementById('control-animation') as HTMLButtonElement
    const progressElement = document.getElementById('progress') as HTMLProgressElement
    const themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement
    const colorToggleButton = document.getElementById('color-toggle') as HTMLButtonElement

    // The buttons show the current theme, and each switches its own half while keeping the other.
    const showThemeToggles = (): void => {
        const [darkOrLight, colorOrGrayscale] = Theme.get().split('-')
        themeToggleButton.lastElementChild!.textContent = darkOrLight === 'light' ? themeToggleButton.dataset['labelLight']! : themeToggleButton.dataset['labelDark']!
        colorToggleButton.lastElementChild!.textContent = colorOrGrayscale === 'color' ? colorToggleButton.dataset['labelColor']! : colorToggleButton.dataset['labelGrayscale']!
    }

    const switchTheme = (theme: string): void => {
        Theme.set(theme)
        Theme.apply(theme)
        showThemeToggles()
    }

    themeToggleButton.addEventListener('click', () => {
        const [darkOrLight, colorOrGrayscale] = Theme.get().split('-')
        switchTheme(`${darkOrLight === 'light' ? 'dark' : 'light'}-${colorOrGrayscale}`)
    })

    colorToggleButton.addEventListener('click', () => {
        const [darkOrLight, colorOrGrayscale] = Theme.get().split('-')
        switchTheme(`${darkOrLight}-${colorOrGrayscale === 'color' ? 'grayscale' : 'color'}`)
    })

    showThemeToggles()

    const maxStep = steps.length - 1
    const STEP_DURATION = 2400
    let playing: number | null = null
    let stepStart = 0

    // One phase per message reveal, plus a trailing phase held after the last message.
    const phaseCount = steps.length + 1
    progressElement.max = phaseCount

    const isFinished = (): boolean => progressElement.value === phaseCount

    // The icon alone gives the button no accessible name, so the label follows the icon.
    const showControl = (control: keyof typeof ICONS): void => {
        controlAnimationButton.innerHTML = ICONS[control]
        controlAnimationButton.ariaLabel = controlAnimationButton.dataset[`label${control[0]!.toUpperCase()}${control.slice(1)}`]!
    }

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
        showControl(isFinished() ? 'replay' : playing !== null ? 'pause' : 'play')
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
        showControl('pause')
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
