# Summary

## Part 1

Write your own `EventEmitter` class. It must contain `on` / `addListener` method, `off` / `removeListener` method, `once` method, `emit` method, `rawListeners` method, `listenerCount` method. Theses basic features are sufficient to implement a full system using the eventing model.
The program can be started via npm script using nodemon(i.e. `npm run task1`).

Test your own `EventEmitter` class with this example of code:

```
const myEmitter = new EventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));
```

## Part 2

Write a class WithTime which should extend EventEmitter implemented in the first task. WithTime should contain execute() method that will call async function with arguments specified and compute the time it takes to execute this async function. execute() function should emit event start, event end and event for the data received.

Async function should data from https://jsonplaceholder.typicode.com/posts/1 and transform it to JSON format.

```
class WithTime extends EventEmitter {
   execute(asyncFunc, ...args) {
       // emit event start, end, data received
       // call asyncFunc with args specified
       // compute the time it takes to execute asyncFunc
   }
}

const fetchFromUrl = (url, cb) => {
   // fetch from https://jsonplaceholder.typicode.com/posts/1
   // transform to JSON
}


const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));
```

## Part 3

Write a program which should do the following:

1. Read the content of CSV file from `./csv` directory (example of data)
2. Use the csvtojson package to convert the data from CSV file to JSON format
3. Write the content of CSV file to a new TXT file in the following format
   - Do not load all the content of the CSV file into RAM via stream, read/write file content line by line
   - In case of read/write errors, log them in the console.
4. The program should be started via npm script using nodemon(i.e. `npm run task3`).
