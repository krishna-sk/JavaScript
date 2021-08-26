// PRIMITIVE

// String
const name = 'John Doe';
console.log(name + " :: " +typeof name);

// Number
const age = 45;
console.log(age + " :: " +typeof age);

// Boolean
const hasKids = true;
console.log(hasKids + " :: " +typeof hasKids);

// Null
const car = null;
console.log(car + " :: " +typeof car);

// Undefined
let test;
console.log(test + " :: " +typeof test);

// Symbol
const sym = Symbol();
console.log(sym);
console.log(typeof sym);

// REFERENCE TYPES - Objects
// Array
const hobbies = ['movies', 'music'];
console.log(hobbies + " :: " +typeof hobbies);

// Object literal
const address = {
  city: 'Boston',
  state: 'MA'
}
console.log(address + " :: " +typeof address);

const today = new Date();
console.log(today + " :: " +typeof today);