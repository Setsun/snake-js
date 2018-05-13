# Snake.js (Sean Luo)

The project is built via `parcel-bundler` for ease of development / build, with the `index.html` file as the entry point.
The project setup is similar to what I have setup for my GitHub page: https://github.com/Setsun/setsun.github.io
Type-checking is done with `flow-type` and tests are written with `jest`.

## Start Instructions
```
npm install;
npm start;
```

## `GameEngine(size: number, rootEl: HTMLElement, onStart: Function, onStop: Function)`
The Snake.js game is centered around the `GameEngine` class which handles the following responsibilities:
- Managing state the different game objects and how they relate to one another (the grid, the snake, and the apple).
- Determining win / lose conditions (collisions, etc).
- Updating the game state at each frame, and re-rendering.

## `Snake(startPosition: number)`
I had time to also write a `Snake` class which maintains it's own internal state for it's body and the current direction that it moves. The `Snake` class has public class methods of `.move` and `.addBodyCell` for the `GameEngine` to decide when it needed to move or grow the snake based on it's own engine-specific criteria.

## Type Checking
I added `flow-type` for static type checking of function signatures / return types, class properties types, and quickly catching property lookups on `undefined` / `null` values. Adding static type checking definitely gave me more confidence in the code I was writing, given the imperative nature of the game engine and using the native DOM APIs.

## Testing
For unit testing, I added `jest` and intended to test the `GameEngine` and `Snake` classes. Unfortunately I only had time to stub out a quick file for the `GameEngine`.

Currently the `GameEngine` is hard to test, because it requires mocking many of the native DOM APIs to better ensure we are testing the `GameEngine` itself and not the implementations of modules that it consumes. Mocking out `Math.random`, `document.createElement`, and other methods would have made testing a bit easier. Also if updating the state was more pure / functional and didn't rely on side-effects, it certainly would also have made it easier to test.


## Follow-on items
If I had more time, these are the items I would follow up on to improve the project.

- Write more `jest` tests, testing current class methods to ensure that we are aware when things change about existing class methods to prevent other modules from breaking.

- Fix existing `flow-type` errors.

- Potentially create an `Apple` class for consistency, but current requirements are simple enough that an early abstraction might be overkill.

- Polyfills via `core-js` for various methods that can't be transpiled with `babel`.

- Optimize usage of `requestAnimationFrame`. I ended up using a `setTimeout` for controlling the speed of the render loop, and I feel like there is a more robust way of doing that.

- Add more complex collision logic. Currently the only collision logic implemented is the bumping into the walls and the apple. Ideally would have liked to implement the snake colliding with itself, but we can pretend that this is the easy mode version of Snake :)
