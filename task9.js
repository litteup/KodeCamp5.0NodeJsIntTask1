/*
Step 8: Create Advanced Counter Factory
Task 8.1: Create a createAdvancedCounter(config) function.

Task 8.2: Ensure the counter respects min/max boundaries.

Task 8.3: Add a getConfig() method.
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

  counter.getConfig = () => ({ initialValue: initial });

  return counter;
};

const createAdvancedCounter = ({
  initialValue = 0,
  step = 1,
  min = -Infinity,
  max = Infinity,
} = {}) => {
  let count = Math.max(min, Math.min(max, initialValue));
  const initial = initialValue;
  let callback = null;

  const counter = Object.create(CounterPrototype);

  counter.increment = () => {
    const newCount = Math.min(max, count + step);
    count = newCount;
    if (callback) callback(count, 'increment');
    return count;
  };

  counter.decrement = () => {
    const newCount = Math.max(min, count - step);
    count = newCount;
    if (callback) callback(count, 'decrement');
    return count;
  };

  counter.getValue = () => count;

  counter.reset = () => {
    count = Math.max(min, Math.min(max, initial));
    if (callback) callback(count, 'reset');
    return count;
  };

  counter.transform = (transformFn) => {
    count = Math.max(min, Math.min(max, transformFn(count)));
    if (callback) callback(count, 'transform');
    return count;
  };

  counter.createPredicate = () => (threshold) => count >= threshold;

  counter.onChange = (cb) => {
    callback = cb;
    return counter;
  };

  counter.add = (value) =>
    createAdvancedCounter({
      initialValue: count + value,
      step,
      min,
      max,
    });

  counter.subtract = (value) =>
    createAdvancedCounter({
      initialValue: count - value,
      step,
      min,
      max,
    });

  counter.multiply = (value) =>
    createAdvancedCounter({
      initialValue: count * value,
      step,
      min,
      max,
    });

  counter.snapshot = () =>
    createAdvancedCounter({
      initialValue: count,
      step,
      min,
      max,
    });

  counter.batch = ({ increments = 0, decrements = 0 }) => {
    const newCount = Math.max(
      min,
      Math.min(max, count + increments * step - decrements * step)
    );
    count = newCount;
    if (callback) callback(count, 'batch');
    return count;
  };

  counter.toString = () =>
    `Counter(current: ${count}, initial: ${initial}, step: ${step}, min: ${min}, max: ${max})`;

  counter.getConfig = () => ({ initialValue: initial, step, min, max });

  return counter;
};

const counter = createAdvancedCounter({
  initialValue: 5,
  step: 2,
  min: 0,
  max: 10,
});

// Test basic functionality and state isolation
const counter1 = createCounter(0);
const counter2 = createCounter(10);
console.log(counter1.getValue()); // 0
console.log(counter2.getValue()); // 10
counter1.increment(); // 1
console.log(counter1.getValue()); // 1
console.log(counter2.getValue()); // 10 (no interference)

// Test higher-order functions
const counter3 = createCounter(5);
counter3.transform((x) => x * 2); // 10
console.log(counter3.getValue()); // 10
const isAbove = counter3.createPredicate();
console.log(isAbove(5)); // true
counter3.onChange((value, op) => console.log(`${op}: ${value}`));
counter3.increment(); // Logs: increment: 11

// Test immutable methods
const counter4 = createCounter(5);
const newCounter = counter4.add(3);
console.log(counter4.getValue()); // 5 (unchanged)
console.log(newCounter.getValue()); // 8

// Test advanced counter
const advCounter = createAdvancedCounter({
  initialValue: 5,
  step: 2,
  min: 0,
  max: 10,
});
console.log(advCounter.increment()); // 7
console.log(advCounter.increment()); // 9
console.log(advCounter.increment()); // 10 (max)
console.log(advCounter.decrement()); // 8
console.log(advCounter.getConfig()); // { initialValue: 5, step: 2, min: 0, max: 10 }

// Test batch and toString
console.log(advCounter.batch({ increments: 1, decrements: 2 })); // 4
console.log(advCounter.toString()); // Counter(current: 6, initial: 5, step: 2, min: 0, max: 10)
