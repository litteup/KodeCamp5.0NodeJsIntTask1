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
console.log(counter.getConfig()); // { initialValue: 5, step: 2, min: 0, max: 10 }
console.log(counter.increment()); // 7
console.log(counter.increment()); // 9
console.log(counter.increment()); // 10 (respects max)
console.log(counter.decrement()); // 8
console.log(counter.decrement()); // 6
console.log(counter.decrement()); // 4
console.log(counter.decrement()); // 2
console.log(counter.decrement()); // 0 (respects min)
