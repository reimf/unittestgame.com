export class Translation {
    private readonly text: string

    public constructor(text: string) {
        this.text = text
    }

    public toString(): string {
        return this.text
    }
}
