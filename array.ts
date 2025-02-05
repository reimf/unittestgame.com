interface Array<T> {
    random(): T
}

Object.assign(Array.prototype, {
    random() {
        return this[Math.floor(Math.random() * this.length)]
    },
} as Array<any>)
