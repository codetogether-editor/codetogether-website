var Rx = require('rxjs/Rx');

// Usage:

// var observable = new Observable();

// observable.subscribe((value) => {
//     console.log(value);
// });

// observable.next('first value');
// observable.next('second value');

module.exports = function () {
    return Rx.Subject;
}