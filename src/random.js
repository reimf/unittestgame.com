export class Random {
    static elementFrom(list) {
        return list[this.integerUnder(list.length)];
    }
    static integerUnder(x) {
        return Math.floor(Math.random() * x);
    }
}
