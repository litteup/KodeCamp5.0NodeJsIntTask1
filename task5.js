// Task 5

/*
Step 5: Add Higher-Order Functions
-- Task 5.1: Add a transform(transformFn) method.
-- Task 5.2: Add a createPredicate() method.
-- Task 5.3: Add an onChange(callback) method.
*/

const CounterPrototype = require('./counter');

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

  return counter;
}

const counter = createCounter(5);

//Test transform
console.log(counter.transform((x) => x * 2)); //10
console.log(counter.transform((x) => Math.max(x, 0))); //10

//Test createPredicate
const isAboveThreshold = counter.createPredicate();
console.log(isAboveThreshold(5)); //true (10 > 5)
console.log(isAboveThreshold(15)); //false (10 < 15)

// Test onChange
counter.onChange((value, operation) => {
  console.log(`Operation: ${operation}, New Value: ${value}`);
});
counter.increment(); // Operation: increment, New Value: 11
counter.decrement(); // Operation: decrement, New Value: 10
