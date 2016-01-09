'use strict';

/**
 * @function toError
 * Parses a supplied string converting it to a known Error type or
 * a default Error
 *
 * @param   {String}    errString      a string representing a thrown error
 * @returns {Error}
 */

module.exports = function toError(errString) {

    var inType = typeof errString;

    if (inType !== 'string') {
        throw new TypeError('"' + inType + '"' + ' supplied, "string" required');
    }

    function stringError(ErrorHandler, message, stack) {

        ErrorHandler.call(this);
        this.message = message || 'Unknown';

        if (stack) {
            this.stack = stack;
            return;
        }

        ErrorHandler.captureStackTrace(this, this.constructor);

    }

    var errorInfo = errString
            .split(/    at (.+) \((.+):(\d+):(\d+)\)/i)[0]
            .split('\n')
            .filter(function (item) {
                return item.length > 0;
            }).pop(),

        // ErrorType: message
        //     at someMethod (/some/path/to/script.js:50:16)

        stack = errorInfo.split(': ').length > 1 &&
                [errorInfo, errString.split(errorInfo)[1]].join('').trim(),

        message,
        ErrorHandler;

    // extract type of Error and message and obtain a reference to
    // its prototype

    errorInfo    = errorInfo.split(': ');
    message      = errorInfo[1],
    ErrorHandler = (global[errorInfo[0]] || global.Error);

    stringError.prototype             = Object.create(ErrorHandler.prototype);
    stringError.prototype.constructor = stringError;

    return new stringError(ErrorHandler, message, stack);

};
