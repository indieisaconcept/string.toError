'use strict';

var toError = require('../'),
    sinon   = require('sinon'),
    expect  = require('chai').expect;

describe('string.toError()', function () {

    var errorString = [
            '/script.js:53',
            '        return foo;',
            '               ^',
            '',
            'ReferenceError: foo is not defined',
            '    at self.initialize (/script.js:53:16)',
            '    at process.initializePayload (/script.js:154:25)'
        ].join('\n');

    it('should be a function', function () {
        expect(toError, 'is a function').to.be.a('function');
        expect(toError.length, 'has an arity of 1').to.equal(1);
    });

    it('correctly subclasses Error', function() {

        var Child    = toError,
            Parent   = Error,
            instance = Child('I am an error');

        expect(
            Object.getPrototypeOf(Object.getPrototypeOf(instance)),
            'instance.prototype.prototype is equal to Error.prototype'
        ).to.equal(Parent.prototype);

        expect(
            instance instanceof Parent,
            'valid instance of eventemitter3'
        ).to.equal(true);

    });

    it('throws an error if non-string supplied', function () {
        expect(
            toError,
            'is a function'
        ).to.throw(/"undefined" supplied, "string" required/);
    });

    it('returns a valid error', function () {

        var error = toError(errorString);

        expect(
            error.toString(),
            'error.toString() is correct'
        ).to.equal('ReferenceError: foo is not defined');

        expect(
            error.message,
            'error message is correct'
        ).to.equal('foo is not defined');

    });

    describe('Error.captureStackTrace', function () {

        afterEach(function () {
            Error.captureStackTrace.restore();
        });

        it('not called Error.captureStackTrace if stack', function () {

            var spy    = sinon.spy(Error, 'captureStackTrace'),
                result = toError(errorString);

            expect(spy.called).to.equal(false);

        });

        it('called Error.captureStackTrace if no stack found', function () {

            var spy     = sinon.spy(Error, 'captureStackTrace'),
                result  = toError('I am an error');

            expect(spy.called).to.equal(true);

        });

    });

});
