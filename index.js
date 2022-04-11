// Import stylesheets
import './style.css';

// Symbol.iterator
// ************************************

// For instance, we have an object that is not an array, but looks suitable for for..of.

// Like a range object that represents an interval of numbers:

let range = {
  from: 1,
  to: 5,
};

//To make the range object iterable (and thus let for..of work) we need to add a method to the object named Symbol.iterator (a special built-in symbol just for that).

range[Symbol.iterator] = function () {
  return {
    // to return the iterator object
    current: this.from,
    last: this.to,

    //next() is called on each iteration by the for--of loop
    next() {
      //to return the value as an object
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

//iterating over range
for (let num of range) {
  console.log(num); // 1,2,3,4,5
}

//String is iterable
// *********************************************

// Arrays and strings are most widely used built-in iterables.

// For a string, for..of loops over its characters:
for (let char of 'javascript') {
  console.log(char); //j,a,v,a,s,c,r,i,p,t
}

let string1 = 'a3😀2b7💖c';
let newString = '';
for (let char of string1) {
  newString += char + ' ';
}

console.log(newString); //a 3 😀 2 b 7 💖 c

//Calling an iterator explicitly
// -------------------------------------------

//iterating over a string in exactly the same way as for..of, but with direct calls. This code creates a string iterator and gets values from it “manually”:

let str = 'Hello';

let iterator = str[Symbol.iterator]();

do {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); //outputs characters one by one;
} while (true);

//H e l l object
//That is rarely needed, but gives us more control over the process than for..of. For instance, we can split the iteration process: iterate a bit, then stop, do something else, and then resume later.

// Iterables and array-likes
// ----------------------------------

// Iterables are objects that implement the Symbol.iterator method, as described above.
// Array-likes are objects that have indexes and length, so they look like arrays.

// the object that is array-like, but not iterable:
let arrayLike = {
  0: 'Hello',
  1: 'World',
  length: 2,
};

// for (let item of arrayLike){
// console.log(item);
//Error: arrayLike is not iterable
// }

// Both iterables and array-likes are usually not arrays, they don’t have push, pop etc.

//Array.from
// ************************************

//There’s a universal method Array.from that takes an iterable or array-like value and makes a “real” Array from it. Then we can call array methods on it.

let newArr = Array.from(arrayLike); //takes the object, examines it for being an iterable or array-like, then makes a new array and copies all items to it.

console.log(newArr); //["Hello", "World"]
console.log(newArr.pop()); //world

//The same happens for an iterable:
let arr1 = Array.from(range);
console.log(arr1); //[1, 2, 3, 4, 5]

//The full syntax for Array.from also allows us to provide an optional “mapping” function:

//Array.from(obj[, mapFn, thisArg])
// --------------------------------------

// The optional second argument mapFn can be a function that will be applied to each element before adding it to the array, and thisArg allows us to set this for it.

let arr2 = Array.from(range, (num) => num * 2);

console.log(arr2);
[2, 4, 6, 8, 10];

// Here we use Array.from to turn a string into an array of characters:
// -------------------------------------------

let string2 = 'x🎉97🧁y🚀';
let chars = [];
for (let char of string2) {
  chars.push(char);
}

console.log(chars); //["x", "🎉", "9", "7", "🧁", "y", "🚀"]

// We can even build surrogate-aware slice on it:
function sliceString(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let string3 = 'm🎉9K🧁y🚀';
console.log(sliceString(string3, 1, 3)); //🎉9
