//Task 2.1 Create CounterPrototype object with the following methods:
// increment() - increases count by 1
// decrement() - decreases count by 1
// getValue() - returns current count value
// reset() - resets count to initial value
// Hint: At this stage, you can leave the methods empty or throw "Not implemented" errors.

const CounterPrototype = {
  increment() {
    throw new Error('Method not yet implemented!');
  },

  decrement() {
    throw new Error('Method not yet implemented!');
  },

  getValue() {
    throw new Error('Method not yet implemented!');
  },

  reset() {
    throw new Error('Method not yet implemented!');
  },
};

// Step 3: Implement Basic Factory Function with Closures. Create the factory function that uses closures to maintain private state.

function createCounter(initialValue = 0) {
  let count = initialValue;

  const counter = Object.create(CounterPrototype);

  return counter;
}

module.exports = CounterPrototype;
