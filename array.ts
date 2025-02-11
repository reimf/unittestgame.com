interface Array<T> {
    randomElement(): T
}

Object.assign(Array.prototype, {
    randomElement(): any {
        return this[Math.randomInt(this.length)]
    },
} as Array<any>)
