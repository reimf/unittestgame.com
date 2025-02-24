export class Random {
    static elementFrom(list) {
        if (list.length === 0)
            return undefined;
        return list[this.randomInt(list.length)];
    }
    static randomInt(x) {
        return Math.floor(Math.random() * x);
    }
}
