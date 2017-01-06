module.exports = function ($stateProvider, $locationProvider) {
    var stateViews = require.context('./states', true, /^\.\/.*\.html$/);
    var resolve = require('./states/editor/resolve');
    var controller = require('./states/editor/controller');

    $locationProvider.html5Mode(true);

    $stateProvider.state({ name: 'login', url: '/login', template: stateViews('./login/template.html') });
    $stateProvider.state({ name: 'authenticating', parent: 'login', url: 'authenticating' });
    $stateProvider.state({ name: 'editor', url: '/', template: stateViews('./editor/template.html'), resolve, controller });
    $stateProvider.state({ name: 'editor.file', parent: 'editor', url: 'file/:id', resolve, controller });
}