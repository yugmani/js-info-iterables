// Import stylesheets
import './style.css';

// Symbol.iterator
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
  console.log(num);
}
