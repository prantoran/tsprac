// intersection type

type Draggable = {
    drag: () => void;
}

type Resizable = {
    resize: () => void;
}

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
    drag: () => console.log("Dragging..."),
    resize: () => console.log("Resizing...")
};

textBox.drag();
textBox.resize();

// union type


function kg2lb(kg: number | string): number {
    // narrowing
    if (typeof kg === "number") {
        return kg * 2.2;
    } else {
        return parseInt(kg) * 2.2;
    }
}

console.log(kg2lb(10));
console.log(kg2lb("10kg"));


// type alias

type Employee = {
    readonly id: number,
    name?: string,
    retire: (date: Date) => void;
}

let employee: Employee = {
    id: 1,
    retire: (date: Date) => {
        console.log(date);
    }
};

employee.name = "Pinku";
console.log(employee.name?.toUpperCase()); // optional chaining


// Literal type

type Quantity = 50 | 100;

let quantity: Quantity = 50;
quantity = 100;
console.log(quantity);

// nullable type

function greet(name: string | null) {
    if (name)
        console.log("Hello " + name.toUpperCase());
    else
        console.log("Hello");
}

greet("Pinku");
greet(null);

// Optional chaining

type Customer = {
    birthday?: Date;
}

function getCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(1);
console.log(customer?.birthday?.getFullYear());

customer = getCustomer(0);
console.log(customer?.birthday?.getFullYear());

// Nullish coalescing operator

let speed: number | null = null;
let ride = {
    speed: speed ?? 30
};

console.log(ride.speed);

// Type Assertions

// let phone = document.getElementById("phone") as HTMLInputElement;
// let phone2 = <HTMLInputElement>document.getElementById("phone");
// console.log(phone.value);

// Unknown type

function render(document: unknown) {
    if (typeof document === "string") {
        console.log(document.toUpperCase());
    } else {
        console.log(document);
    }
}

render("Hello World");
render({ name: "Pinku" });

// never type

// function processEvents(): never {
//     while (true) {
//         // process the event
//     }
// }

// processEvents();
// console.log("This will never be printed");