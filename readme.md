# Call-Trace

This is a really simple module to allow you to see the call stack from the place
where the function is executed. This is mostly useful

Essentially it is the same as writing `console.log(new Error.stack)`.

But a (tiny) bit more convenient.

### Usage

```javascript
const trace = require('call-trace');


// somewhere in your code
trace();
```

You can also provide unlimited arguments, which will cause trace to only log
when the argument asserts to a truthy value.

This is particularly useful when debugging because you may wish to only log the
call stack when you arrive in a method with a particular set of arguments so you
can determine how you got there. e.g.

```javascript

const weirdValue = 123;

// This will log the function call stack
trace(weirdValue === 123);


const expectedValue = true;

// This will noop
trace(!expectedValue);
```

### Licence
MIT
