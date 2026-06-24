export class Square {
    constructor(
        public side: number
    ) { }

    getArea(): number {
        return this.side * this.side;
    }
}
