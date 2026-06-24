

function Component(constructor: Function) {
    console.log('Component decorator called');
    constructor.prototype.uniqueID = Date.now();
    constructor.prototype.insertInDOM = () => {
        console.log('Inserting in DOM...');
    }
}


@Component
class ProfileComponent { }

let profile = new ProfileComponent();
console.log(profile, typeof profile);
// console.log(profile.uniqueID);
// profile.insertInDOM();

// ---------------------------------------------

// Parameterized decorator

type CommponentOptions = {
    selector: string;
}

// return custom decorator
function ComponentFactory(options: CommponentOptions) {
    return (constructor: Function) => {
        console.log('Component decorator called', options);
        constructor.prototype.options = options;
        constructor.prototype.uniqueID = Date.now();
        constructor.prototype.insertInDOM = () => {
            console.log('Inserting in DOM...');
        }
    }
}

@ComponentFactory({ selector: "#my-profile" })
class ProfileComponent2 { }

let profile2 = new ProfileComponent2();
console.log(profile2);

// -----------------------------------------

// Decorator commposition

function Pipe(constructor: Function) {
    console.log('Pipe decorator called');
    constructor.prototype.pipe = true;
}

@ComponentFactory({ selector: "#my-profile" })
@Pipe
class ProfileComponent3 { }


let profile3 = new ProfileComponent3();
console.log(profile3);


// -----------------------------------------

// Method decorator

/*
Method decorator receives 3 arguments:
1. target: The prototype of the class
2. name: The name of the method
3. descriptor: The property descriptor
*/
function Log(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log(`Method decorator called for ${name}`);
    console.log("target:", target);
    const original = descriptor.value as Function;
    descriptor.value = (...args: any) => {
        console.log("Before calling the original method");
        original.call(target, ...args);
        console.log("After calling the original method");
    }
}

class Person {
    @Log
    say(msg: string) {
        console.log('Person says ' + msg);
    }
}

let person = new Person();
person.say("Hello, Pinku!");


// -----------------------------------------

// Accessor decorator

function Capitalize(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log(`Accessor decorator called for ${name}`, "target:", target);
    const original = descriptor.get as Function; // descriptor.value does not work for getters/setters
    descriptor.get = function () {
        const res = original.call(this);
        return (typeof res === "string") ? res.toUpperCase() : res;
    }
}
class Person2 {
    constructor(public firstName: string, public lastName: string) {
    }

    @Capitalize
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

let person2 = new Person2("pinku", "nath");
console.log(person2.fullName);

// -----------------------------------------

// Property decorators

function MinLength(length: number) {
    console.log('MinLength decorator called', length);
    return (target: any, propertyName: string) => {
        let value: string;
        const descriptor: PropertyDescriptor = {
            get() {
                console.log(`Getting ${propertyName}`);
                return value;
            },
            set(newValue: string) {
                console.log(`Setting ${propertyName} to ${newValue}`);
                if (newValue.length < length) {
                    throw new Error(`${propertyName} must be at least ${length} characters long.`);
                }
                value = newValue;
            }
        };
        Object.defineProperty(target, propertyName, descriptor);
    }
}
class User {
    @MinLength(6)
    password: string;
    constructor(password: string) {
        this.password = password;
    }
}

let user = new User("125633");
console.log(user.password);

user.password = "1234567";

// -----------------------------------------

// Parameter decorators

type WatchParameter = {
    methodName: string,
    parameterIndex: number
}

const watchParameters: WatchParameter[] = [];

function Watch(target: any, methodName: string, parameterIndex: number) {
    console.log(`Watch decorator called for ${methodName}`);
    console.log("target:", target);
    console.log("parameterIndex:", parameterIndex);
    watchParameters.push({ methodName, parameterIndex });
}

class Vehicle {
    move(@Watch speed: number) {
        console.log(`Moving at ${speed} km/h`);
    }
}

console.log(watchParameters);
const vehicle = new Vehicle();
vehicle.move(60);
vehicle.move(20);