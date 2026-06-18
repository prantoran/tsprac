

console.log("Hello, World!");

// teesinit
let age: number = 30;
if (age < 50)
    age += 10;
console.log(`Your age is ${age}`);


let sales = 123_456_789;
let course = "TypeScript";
let is_published = true;
let level; // any type
level = 1;
level = "a lot";

console.log(sales, course, is_published, level);

// function render(document: any) {
//     console.log(document);
// }

let numbers: number[] = [1, 2, 3];
let numbers2 = [1, 2, 3]; // type: number[]
// let numbers3 = []; // type: any[]
let numbers4: number[] = [];

console.log(typeof numbers, typeof numbers2, typeof numbers4);


numbers.forEach(n => console.log(n.toExponential()));

// tuples
let user: [number, string] = [1, "Pinku"];
user.push(1); // BUG: this should not be allowed, but it is allowed in TS

const enum Size { Small = 1, Medium, Large };
let mySize: Size = Size.Medium;
console.log(mySize); // 2


function calculateTax(income: number, taxYear?: number): number {
    if ((taxYear || 2022) < 2022)
        return income * 1.2;
    return income * 1.3;
}

console.log(calculateTax(10_000, 2020));

let employee: {
    readonly id: number,
    name?: string,
    retire: (date: Date) => void;
} = {
    id: 1,
    retire: (date: Date) => {
        console.log(date);
    }
};

employee.name = "Pinku";
console.log(employee.name?.toUpperCase()); // optional chaining


type Employee = {
    readonly id: number,
    name?: string,
    retire: (date: Date) => void;
};

let employee2: Employee = {
    id: 2,
    retire: (date: Date) => {
        console.log(date);
    }
};

employee2.name = "Pinku2";
console.log(employee2.name?.toUpperCase());

function kgToLbs(weight: number | string): number {
    if (typeof weight === "number")
        return weight * 2.2;
    else
        return parseInt(weight) * 2.2;
}

console.log(kgToLbs(10));
console.log(kgToLbs("10kg"));

// Intersection Types
type Draggable = {
    drag: () => void;
};

type Resizable = {
    resize: () => void;
};

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
    drag: () => console.log("Dragging..."),
    resize: () => console.log("Resizing...")
};

textBox.drag();
textBox.resize();

// Literal Types
type Quantity = 50 | 100;
let quantity: Quantity = 100;
// quantity = 75; // Error: Type '75' is not assignable to type 'Quantity'

type Metric = "cm" | "inch";
let metric: Metric = "cm";
// metric = "mm"; // Error: Type '"mm"' is not assignable to type 'Metric'

console.log(quantity, metric);

// Nullable Types
function greet(name: string | null | undefined): void {
    if (name)
        console.log(`Hello, ${name.toUpperCase()}!`);
    else
        console.log("Hello, Guest!");
}

greet(null);
greet(undefined)

// Optional Chaining
type Customer = {
    birthday?: Date;
};

function getCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthday: new Date() };
}

// Optional property access operator
let customer = getCustomer(1);
console.log(customer?.birthday?.getFullYear());

customer = getCustomer(0);
console.log(customer?.birthday?.getFullYear());

// Optional element access operator
let customers: Customer[] = [{ birthday: new Date() }];
console.log(customers?.[0]?.birthday?.getFullYear());

// Optional call
let log: any = (message: string) => console.log(message);
log?.("This is a log message.");

// Generic functions
function Display<T, U>(value1: T, value2: U): T & U {
    return { ...value1, ...value2 };
}

console.log(Display<object, object>({ name: "Pinku" }, { exp: 6 }));

// generic interfaces
interface User<T, U> {
    name: T;
    email: U;
}

const user2: User<string, string> = {
    name: "Pinku",
    email: "pp@hola.com"
}

console.log(user2.name, user2.email);

// generic classes
class UserClass<T, U> {
    name: T;
    email: U;
    constructor(name: T, email: U) {
        this.name = name;
        this.email = email;
    }

    greet() {
        console.log(`Hello, ${this.name}! Your email is ${this.email}.`);
    }
}

const user3 = new UserClass<string, string>("Pinku", "pp2@hola.com");
user3.greet();

class UserClass2<T> {
    name: T;
    constructor(name: T) {
        this.name = name;
    }
    greet(): T {
        return this.name;
    }
}

const user4 = new UserClass2<string>("Pinku");
const user5 = new UserClass2<number>(123);
const user6 = new UserClass2<{ name: string }>({ name: "Pinku" });

console.log(user4.greet());
console.log(user5.greet());
console.log(user6.greet());

// Generic Constraints
function Gen<T extends { length: number }>(value: T): T {
    console.log("value.length: ", value.length);
    return value;
}

const val1 = Gen("Hello");
console.log(val1);

const val2 = Gen([1, 2, 3]);
console.log(val2);

const val3 = Gen({ length: 10 });
console.log(val3);


function someFunc<T>(value: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => {
        resolve(value);
    }, 1000));
}

const someValue = someFunc<string>("Hello, Someone!");
someValue.then(value => console.log(value));


// interface vs type

interface AnimalInterface {
    type: string;
}

interface Dog extends AnimalInterface {
    bark(): void;
}

class Labrador implements Dog {
    type: string = "Labrador1";
    bark() {
        console.log("Woof!");
    }
}

const myDog: Dog = new Labrador();
console.log(myDog.type);
myDog.bark();

type AnimalType = {
    type: string;
}

type DogType = AnimalType & {
    bark(): void;
}

const myDog2: DogType = {
    type: "Labrador2",
    bark() {
        console.log("Woof!");
    }
};
console.log(myDog2.type);
myDog2.bark();


// class accessors

class ProductAccessors {
    private _price: number;
    private static nextID: number = 1;
    private _id: number;

    constructor(price: number) {
        this._id = ProductAccessors.nextID++;
        this._price = price;
    }

    get id(): number {
        return this._id;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        if (value <= 0) {
            throw new Error("Price must be positive");
        }
        this._price = value;
    }
}

const product = new ProductAccessors(100);
console.log(product.id);
console.log(product.price);
product.price = 200;
console.log(product.price);


// abstract classess

abstract class AbstractItem {
    private static nextID: number = 1;
    public readonly id: number;
    constructor() {
        this.id = AbstractItem.nextID++;
    }
    abstract print(): void;
}

class Product extends AbstractItem {
    constructor(public name: string, public price: number) {
        super();
    }
    print(): void {
        console.log(`Product: ${this.name}, Price: ${this.price}`);
    }
}

const product2 = new Product("Product2", 200);
product2.print();


// type assertion

let data: any = "1000";
console.log((data as string).repeat(3));