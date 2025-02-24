export class Random {
    static elementFrom(list) {
        return list[this.randomInt(list.length)];
    }
    static randomInt(x) {
        return Math.floor(Math.random() * x);
    }
}
