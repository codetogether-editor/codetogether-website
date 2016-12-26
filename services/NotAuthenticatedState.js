var toState;
var toParams;

module.exports = function () {
    function get() {
        return { toState, toParams };
    }

    function set({ fromState, fromParams }) {
        toState = fromState;
        toParams = fromParams;
    }

    return { get, set };
}