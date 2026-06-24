// 1. Generic Classes
class KeyValuePair<K, V> {
    constructor(public key: K, public value: V) { }
}

const pair = new KeyValuePair<string, number>("age", 30);
const pair2 = new KeyValuePair("name", "Pinku"); // Type inference works here too
console.log(pair.key, pair.value);
console.log(pair2.key, pair2.value);

// Example of a Generic Stack
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    get isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(numberStack.pop()); // 20
console.log(numberStack.peek()); // 10

const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.pop()); // "World"


// 2. Generic Functions
function wrapInArray<T>(value: T): T[] {
    return [value];
}

const numbers = wrapInArray(5); // inferred as number[]
const strings = wrapInArray("hello"); // inferred as string[]
console.log(numbers);
console.log(strings);

// Merging objects generically
function merge<U, V>(obj1: U, obj2: V): U & V {
    return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Pinku" }, { age: 30 });
console.log(merged.name, merged.age);


// 3. Generic Interfaces
interface Result<T> {
    data: T | null;
    error: string | null;
}


function fetchUser(): Result<{ name: string; role: string }> {
    return {
        data: { name: "Pinku", role: "Admin" },
        error: null
    };
}

const userResult = fetchUser();
console.log(userResult.data?.name);


interface User {
    name: string;
}


function fetch<T>(url: string): Result<T> {
    console.log('url: ', url);
    return {
        data: null,
        error: null
    };
}

console.log(fetch<User>("url").data?.name);
// 4. Generic Constraints
// Restricting generic types to certain shapes or base types

function echo<T extends string | number | CustomerConstraint>(value: T): T {
    return value;
}

console.log(echo('1111'));


class PersionConstraint {
    constructor(public name: string) {
    }
}

class CustomerConstraint extends PersionConstraint {
    constructor(name: string, public email: string) {
        super(name);
    }
}

console.log(echo(new CustomerConstraint("Pinku", "[EMAIL_ADDRESS]")));

interface Shape {
    draw(): void;
}

class Circle implements Shape {
    draw() {
        console.log("Drawing a circle");
    }
}

class Square implements Shape {
    draw() {
        console.log("Drawing a square");
    }
}

// T must be an instance/type that implements Shape interface
function drawShape<T extends Shape>(shape: T): void {
    shape.draw();
}

drawShape(new Circle());
drawShape(new Square());

// Constraint with object properties (e.g., must have length property)
function printLength<T extends { length: number }>(arg: T): void {
    console.log(`Length is: ${arg.length}`);
}

printLength("Hello"); // String has length
printLength([1, 2, 3]); // Array has length


// 5. The keyof Operator / Key Constraints
// keyof returns a union of keys of an object type

interface Product {
    id: number;
    name: string;
    price: number;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const product: Product = { id: 1, name: "Laptop", price: 999 };
const productName = getProperty(product, "name"); // type of productName is string
const productPrice = getProperty(product, "price"); // type of productPrice is number
console.log(productName, productPrice);


// 6. Generic Defaults
interface ResponsePayload<T = { status: string }> {
    data: T;
}

const defaultResponse: ResponsePayload = {
    data: { status: "success" }
};

const customResponse: ResponsePayload<string[]> = {
    data: ["item1", "item2"]
};

console.log(defaultResponse.data.status);
console.log(customResponse.data);


// extending generic classes

class Store<T> {
    protected _objects: T[] = [];

    add(obj: T) {
        this._objects.push(obj);
    }
    get_objects(): T[] {
        return this._objects;
    }
}


class CompressibleStore<T> extends Store<T> {
    compress() {
        console.log("Compressing...");
    }
}

const store2 = new CompressibleStore<Product>();
store2.add(product);
store2.compress();

class SearchableStore<T extends { name: string }> extends Store<T> {
    search(query: string): T | null {
        console.log("Searching...");
        return this._objects.find((obj) => obj.name === query) || null;
    }
}

// Fix the generic type parameter
class ProductStore extends Store<Product> {
    filterByCategory(_category: string | null): Product[] {
        return [];
    }
}

const storeSearchable = new SearchableStore<Product>();
storeSearchable.add(product);
storeSearchable.search("Laptop");

const storeProduct = new ProductStore();
storeProduct.add(product);
storeProduct.filterByCategory("Electronics");


// keyof operator

class Store3<T> {
    protected _objects: T[] = [];

    add(obj: T) {
        this._objects.push(obj);
    }
    get_objects(): T[] {
        return this._objects;
    }

    // if T is Product, keyof T is 'id' | 'name' | 'price'
    find(property: keyof T, value: unknown): T | undefined {
        return this._objects.find(obj => obj[property] === value);
    }
}


let store3 = new Store3<Product>();
store3.add({
    id: 1,
    name: "Laptop",
    price: 999
});
store3.find('name', "Laptop");
store3.find('id', 1);
// store3.find('nonExistingProperty', 1);


// Type mapping

type Readonly<T> = {
    readonly [K in keyof T]: T[K];
}

type Optional<T> = {
    [K in keyof T]?: T[K];
}

type ReadonlyOptional<T> = Readonly<Optional<T>>;

let product4: ReadonlyOptional<Product> = {
    name: "Laptop",
    price: 999
}

console.log(product4);