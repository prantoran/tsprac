class Account {
    nickname?: string; // optional property

    // parameter iniliaztion: public id: number => 
    // this creates a public property id and initializes it with the value passed to the constructor
    constructor(public readonly id: number, public name: string, private _balance: number) {
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this._balance += amount;
    }

    get balance(): number {
        return this._balance;
    }

    set balance(value: number) {
        if (value < 0) {
            throw new Error("Balance cannot be negative");
        }
        this._balance = value;
    }
}

let acc = new Account(1, "Pinku", 1000);
acc.deposit(500);
console.log(acc);
console.log(typeof acc);
console.log(acc instanceof Account);
console.log(acc.balance);
acc.balance = 2000;
console.log(acc.balance);



class SeatAssignment {
    // index signature property
    [seatNumber: string]: string;
}

let seats = new SeatAssignment();
seats.A1 = "Pinku";
seats.A2 = "Rinku";
console.log(seats);


class Ride {
    private static  _activeRides: number = 0;
    
    start() {
        Ride._activeRides++;
    }

    stop() {
        Ride._activeRides--;
    }

    static get activeRides(): number {
        return Ride._activeRides;
    }
}

let ride1 = new Ride();
ride1.start();
console.log(Ride.activeRides);
ride1.stop();
console.log(Ride.activeRides);


// inheritance
class Person {
    constructor(public firstName: string, public lastName: string) {
    }   

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    protected walk() {
        console.log(`${this.fullName} is walking`);
    }
}

class Student extends Person {
    constructor(firstName: string, lastName: string, public studentId: number) {
        super(firstName, lastName);
    }

    takeTest() {
        this.walk();
        console.log(`${this.fullName} is taking a test`);
    }
}

let student = new Student("Pinku", "Rinku", 123);
console.log(student);

class Teacher extends Person {
    override get fullName(): string {
        return `Professor ${super.fullName}`;
    }
}

let teacher = new Teacher("Jinku", "Oinku");
console.log(teacher);
console.log(teacher.fullName);

// Polymorphism

function printNames(people: Person[]) {
    for (let person of people) {
        console.log(person.fullName);
    }
}

printNames([student, teacher]);


// Abstract classes and methods

abstract class Shape {
    constructor(public color: string) {
    }

    abstract render(): void;
}

class Circle extends Shape {
    constructor(color: string, public radius: number) {
        super(color);
    }

    override render(): void {
        console.log(`Rendering a ${this.color} circle with radius ${this.radius}`);
    }
}

let shape = new Circle("red", 5);
shape.render();


// interface

// abstract class Calender {
//     constructor(public name: string) {}
//     abstract addEvent(title: string, date: Date): void;
//     abstract removeEvent(id: number): void;
// }

interface Calender {
    name: string;
    addEvent(title: string, date: Date): void;
    removeEvent(id: number): void;
}

interface CloudCalender extends Calender {
    sync(): void;
}

class GoogleCalender implements CloudCalender {
    constructor(public name: string) {
    }

    addEvent(title: string, date: Date): void {
        console.log(`Adding event ${title} on ${date}`);
    }

    removeEvent(id: number): void {
        console.log(`Removing event with id ${id}`);
    }

    sync(): void {
        console.log("Syncing with Google Calender");
    }
}

let googleCalender = new GoogleCalender("My Google Calender");
googleCalender.addEvent("Meeting", new Date());
googleCalender.removeEvent(1);
googleCalender.sync();