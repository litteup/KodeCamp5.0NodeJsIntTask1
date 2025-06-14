// Task 4.2: Implement the methods: increment, decrement, getValue, reset.

const CounterPrototype = require('./counter');

function createCounter(initialValue = 0) {
  let count = initialValue;
  const initial = initialValue; //store initial value for reset

  const counter = Object.create(CounterPrototype);

  //Override prototype methods to access private count

  counter.increment = function () {
    return ++count;
  };

  counter.decrement = function () {
    return --count;
  };

  counter.getValue = function () {
    return count;
  };

  counter.reset = function () {
    return (count = initial);
  };

  return counter;
}

// Task 4.3: Test that two different counter instances don't interfere with each other.
const counter1 = createCounter(0);
const counter2 = createCounter(10);

console.log(counter1.getValue());
console.log(counter2.getValue());

counter1.increment();
console.log(counter1.getValue());
console.log(counter2.getValue());

counter2.decrement();
console.log(counter1.getValue());
console.log(counter2.getValue());
