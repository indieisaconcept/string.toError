# string.toError()

`string.toError` create a valid Error instance from a supplied string.

> This is particularly useful when exceptions are piped to 'stderr' from a child process and you wish to throw / handler this Error from within the parent process.

## Installation

Using npm:

```bash
$ npm i --save string.toerror
```

## usage

```JavaScript
var toError  = require('./'),
    errorStr = `
        /script.js:53
                return foo;
                       ^

        ReferenceError: foo is not defined
            at self.initialize (/script.js:53:16)
            at process.initializePayload (/script.js:154:25)
    `;

console.log(toError(errorStr) instanceof Error);           // => true;
console.log(toError(errorStr) instanceof ReferenceError);  // => true;

console.log(toError(errorStr)); // => ReferenceError

// {    [ReferenceError: foo is not defined]
//      message: 'foo is not defined',
//      stack  : `ReferenceError: foo is not defined
//                    at self.initialize (/script.js:53:16)
//                    at process.initializePayload (/script.js:154:25)`
// }
```
> Example usage of string.toError

## Testing

Mocha is used for testing and a `mocha.opts` file is located in `./test`.

```bash
> npm test
```
> Running tests

## Coverage

Code coverage analysis is also available.

```bash
> npm run cover
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using `npm test`.

## Release History

- **1.0.1**
    - Fixes parsing issue due to whitespace in error string
    - Use util.inherits
- **1.0.0** Initial public release
