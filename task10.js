/*
Step 10: Extension Challenge
10.1: Add a history feature.
*/
const CounterPrototype = {};
const createAdvancedCounter = ({
  initialValue = 0,
  step = 1,
  min = -Infinity,
  max = Infinity,
} = {}) => {
  let count = Math.max(min, Math.min(max, initialValue));
  const initial = initialValue;
  let callback = null;
  const history = [];

  const counter = Object.create(CounterPrototype);

  const addToHistory = (operation, value) => {
    history.push({ operation, value, timestamp: new Date().toISOString() });
  };

  counter.increment = () => {
    const newCount = Math.min(max, count + step);
    count = newCount;
    addToHistory('increment', count);
    if (callback) callback(count, 'increment');
    return count;
  };

  counter.decrement = () => {
    const newCount = Math.max(min, count - step);
    count = newCount;
    addToHistory('decrement', count);
    if (callback) callback(count, 'decrement');
    return count;
  };

  counter.getValue = () => count;

  counter.reset = () => {
    count = Math.max(min, Math.min(max, initial));
    addToHistory('reset', count);
    if (callback) callback(count, 'reset');
    return count;
  };

  counter.transform = (transformFn) => {
    count = Math.max(min, Math.min(max, transformFn(count)));
    addToHistory('transform', count);
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
    addToHistory('batch', count);
    if (callback) callback(count, 'batch');
    return count;
  };

  counter.toString = () =>
    `Counter(current: ${count}, initial: ${initial}, step: ${step}, min: ${min}, max: ${max})`;

  counter.getConfig = () => ({ initialValue: initial, step, min, max });

  counter.getHistory = () => [...history];

  return counter;
};

const counter = createAdvancedCounter({ initialValue: 5 });
counter.increment(); // 6
counter.decrement(); // 5
counter.transform((x) => x * 2); // 10
console.log(counter.getHistory());
// [
//   { operation: "increment", value: 6, timestamp: "..." },
//   { operation: "decrement", value: 5, timestamp: "..." },
//   { operation: "transform", value: 10, timestamp: "..." }
// ]
