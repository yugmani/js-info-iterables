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
