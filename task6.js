// Task 6

/*
Step 6: Implement Immutbility
-- Task 6.1: Add immutable methods: add, subtract, multiply.
-- Task 6.2: Add a snapshot() method.
-- Task 6.3: Test that the original counter is unchanged.
*/

// const CounterPrototype = require('./counter');

const CounterPrototype = {};

function createCounter(initialValue = 0) {
  let count = initialValue;
  const initial = initialValue; //store initial value for reset
  let callback = null;

  const counter = Object.create(CounterPrototype);

  //Override prototype methods to access private count

  counter.increment = function () {
    ++count;
    if (callback) callback(count, 'increment');
    return count;
  };

  counter.decrement = function () {
    --count;
    if (callback) callback(count, 'decrement');
    return count;
  };

  counter.getValue = function () {
    return count;
  };

  counter.reset = function () {
    count = initial;
    if (callback) callback(count, 'reset');
    return count;
  };

  counter.transform = function (transformFn) {
    count = transformFn(count);
    if (callback) callback(count, 'transform');
    return count;
  };

  counter.createPredicate = function () {
    return function (threshold) {
      return count >= threshold;
    };
  };

  counter.onChange = function (cb) {
    callback = cb;
    return counter; //We enable chanining
  };

  counter.add = function (value) {
    return createCounter(count + value);
  };

  counter.subtract = function (value) {
    return createCounter(count - value);
  };

  counter.multiply = function (value) {
    return createCounter(count * value);
  };

  counter.snapshot = function () {
    return createCounter(count);
  };

  return counter;
}

const counter = createCounter(5);
const newCounter = counter.add(3);
console.log(counter.getValue()); // 5 (original unchanged)
console.log(newCounter.getValue()); // 8

const subtractCounter = counter.subtract(2);
console.log(counter.getValue()); // 5 (original unchanged)
console.log(subtractCounter.getValue()); // 3

const multiplyCounter = counter.multiply(2);
console.log(counter.getValue()); // 5 (original unchanged)
console.log(multiplyCounter.getValue()); // 10

const snapCounter = counter.snapshot();
console.log(snapCounter.getValue()); // 5
counter.increment();
console.log(counter.getValue()); // 6
console.log(snapCounter.getValue()); // 5 (snapshot unchanged)
