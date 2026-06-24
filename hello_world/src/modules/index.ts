// import { Circle } from "./shapes";
import * as Shapes from "./shapes" // wildcard import
import Store, { Format } from "./storage"

let circle = new Shapes.Circle(1);
console.log(circle);

let store = new Store();
console.log(store);

console.log(Format)