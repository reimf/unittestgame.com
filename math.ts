interface Math {
    randomInt(x: number): number;
}

Object.assign(Math, {
    randomInt(x: number): number {
        return Math.floor(Math.random() * x)
    }
})
