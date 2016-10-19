module.exports = function ($window) {
    return {
        get: () => {
            return $window.editor;
        }
    }
}