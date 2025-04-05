export class Random {
    static elementFrom(list) {
        return list[this.integerUnder(list.length)];
    }
    static integerUnder(x) {
        return Math.floor(Math.random() * x);
    }
    static integerFromRange(start, length = 0) {
        return Math.random() == 0 ? 0 : Math.floor(start + Math.random() * length);
    }
}
