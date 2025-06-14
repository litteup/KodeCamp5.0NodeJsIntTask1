# Code File Structure

First file is the counter.js and it contains steps 2 and 3.
Files task4 - task10.js contains steps 4 - 10 ( incrementally to show the progress of the code)

# Task 1.1

What I think the main challenges implementing Counter Factory would be be include:

# Task 2.1

Why we created a prototype first instead of putting methods directly in each counter instance :

1. For memory efficiency. If methods were defined inside each instance, every new counter would create separate copies of same functions. But with prototype, all instances share same methods, saving memory.

2. To ensure consistency.

# Counter Factory Implementation

## Step 1: Understanding the Requirements

### Task 1:

This README.md file outlines the challenges, design decisions, and answers to specific questions as part of implementing the counter factory task.

#### Task 1.1: Main Challenges in Implementation

The main challenges in implementing the counter factory include:

1. Wrapping my head around the concept and independently implementing it.
2. Learning how to write a README.md file.
3. Shuffling between the class videos, task materials and internet to fully understand the concept and implement it the expected way without mixing or adding concepts that should not be used while solving the task.
4. **Maintaining Private State with Closures**: Ensuring each counter has its own private `count` variable that cannot be directly accessed or modified from outside the counter instance.
5. **Prototypal Inheritance for Shared Methods**: Setting up shared methods via a prototype while allowing each instance to access its own private state, which requires careful integration of closures and prototype methods.
6. **Higher-Order Functions**: Implementing methods like `transform`, `createPredicate`, and `onChange` that either accept or return functions, ensuring they work seamlessly with the private state.
7. **Immutability**: Creating methods that return new counter instances without modifying the original, which involves duplicating the counter's configuration and state correctly.
8. **ES6 Features**: Refactoring the code to use modern JavaScript features like arrow functions, destructuring, and template literals while maintaining readability and functionality.
9. **Advanced Counter Configuration**: Ensuring the advanced counter respects boundaries (min/max) and custom step values, which adds complexity to state updates.

### Task 2

#### Task 2.2: Why Create a Prototype First?

Creating a prototype first allows all counter instances to share method definitions, saving memory and improving performance. If methods were declared inside each instance, each counter would create its own copy of every function, which is inefficient. Using a shared prototype centralizes logic and promotes code reuse. Creating a `CounterPrototype` object first, instead of putting methods directly in each counter instance, leverages JavaScript's prototypal inheritance to:

- **Memory Efficiency**: Shared methods are stored once in the prototype, reducing memory usage compared to duplicating methods in each instance.
  **Easier Maintenance and Updates:** If we need to fix a bug in a method or add a new feature, we only need to modify the `CounterPrototype` object. The changes will instantly reflect across all existing and newly created counter instances, without having to iterate through them or recreate them.
  **Clearer Intent:** It explicitly indicates that these methods are common behaviors shared by all counters, distinguishing them from instance-specific data (like the `count` itself).
  **Consistency**: All counter instances inherit the same method implementations, ensuring uniform behavior.
- **Extensibility**: The prototype can be extended later to add new methods that all instances will inherit automatically.
- **Separation of Concerns**: The prototype defines the interface, while the factory function handles instance-specific state management.

However, the challenge is that prototype methods cannot directly access the private `count` variable created by closures, requiring us to override these methods in the factory function to close over the private state.

#### Task 3.2: How Prototype Methods Access Private Count

The prototype methods (`increment`, `decrement`, etc.) cannot directly access the private `count` variable because it is scoped within the factory function. To solve this:

- The factory function creates instance-specific methods that close over the private `count` variable.
- These instance-specific methods are assigned to the counter object, overriding the prototype's placeholder methods.
- This approach combines the benefits of shared method definitions (via the prototype) with private state access (via closures).

**Question**: After creating two counters, should they share the same count variable or have separate ones? Why?

**Answer**: Two counters created by `createCounter` should have separate `count` variables. This is because:

**Reason:**

- The factory function uses a closure to create a new `count` variable for each counter instance.
- Closures ensure that each counter's `count` is isolated, preventing interference between counters.
- This isolation is critical for the requirement that `counter1.increment()` does not affect `counter2`, as each counter maintains its own private state.

#### Task 6: Difference Between counter.increment() and counter.add(1)

- **`counter.increment()`**: This is a **mutable** method that modifies the counter's internal `count` by increasing it by 1. It directly changes the state of the original counter and triggers any registered `onChange` callback.

- **`counter.add(1)`**: This is an **immutable** method that returns a new counter instance with a `count` equal to the original `count` plus 1. The original counter's state remains unchanged, adhering to **immutability principles** where operations create new instances rather than modifying existing ones.
