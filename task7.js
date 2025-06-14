/*
Step 7: Enhance with ES6 Features
Task 7.1: Use ES6 features (arrow functions, destructuring, default parameters, template literals, object method shorthand, const/let).

Task 7.2: Add a batch(operations) method with destructuring.

Task 7.3: Add a toString() method with template literals.

*/

const CounterPrototype = {};

const createCounter = (initialValue = 0) => {
  let count = initialValue;
  const initial = initialValue;
  let callback = null;

  const counter = Object.create(CounterPrototype);

  counter.increment = () => {
    ++count;
    if (callback) callback(count, 'increment');
    return count;
  };

  counter.decrement = () => {
    --count;
    if (callback) callback(count, 'decrement');
    return count;
  };

  counter.getValue = () => count;

  counter.reset = () => {
    count = initial;
    if (callback) callback(count, 'reset');
    return count;
  };

  counter.transform = (transformFn) => {
    count = transformFn(count);
    if (callback) callback(count, 'transform');
    return count;
  };

  counter.createPredicate = () => (threshold) => count >= threshold;

  counter.onChange = (cb) => {
    callback = cb;
    return counter;
  };

  counter.add = (value) => createCounter(count + value);

  counter.subtract = (value) => createCounter(count - value);

  counter.multiply = (value) => createCounter(count * value);

  counter.snapshot = () => createCounter(count);

  counter.batch = ({ increments = 0, decrements = 0 }) => {
    count += increments;
    count -= decrements;
    if (callback) callback(count, 'batch');
    return count;
  };

  counter.toString = () => `Counter(current: ${count}, initial: ${initial})`;

  return counter;
};

const counter = createCounter(5);
console.log(counter.batch({ increments: 3, decrements: 1 })); // 7
console.log(counter.toString()); // Counter(current: 7, initial: 5)
