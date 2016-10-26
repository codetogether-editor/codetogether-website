module.exports = function ($stateProvider) {
    var stateViews = require.context("./states", true, /^\.\/.*\.html$/);

    $stateProvider.state({ name: 'login', url: '/login', template: stateViews('./login.html')});
    $stateProvider.state({ name: 'editor', url: '', template: stateViews('./editor.html')});
    $stateProvider.state({ name: 'fileEditing', url: '/file/:id', template: stateViews('./editor.html')});
}