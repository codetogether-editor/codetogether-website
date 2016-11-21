module.exports = function ($stateProvider, $locationProvider) {
    var stateViews = require.context("./states", true, /^\.\/.*\.html$/);

    $locationProvider.html5Mode(true);

    $stateProvider.state({ name: 'login', url: '/login', template: stateViews('./login.html')});
    $stateProvider.state({ name: 'editor', url: '/', template: stateViews('./editor.html')});
    $stateProvider.state({ name: 'editor.file', parent: 'editor', url: 'file/:id' });
}