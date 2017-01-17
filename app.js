var app = require('./app.module');
var appCfg = require('./app.defaults');
var run = require('./app.run');
var routes = require('./app.routes');
var config = require('./app.config');
var less = require('./assets/less/style.less');

window.App = app;
app.cfg = appCfg; // global settings

function createComponents({ controllers, templates }) {
    controllers.keys().forEach(function (controllerPath) {
        var name = controllerPath.split('/')[1];
        var path = controllerPath.substr(0, controllerPath.lastIndexOf('/'));

        if (path.includes('dialogs')) {
            return;
        }

        var templatePath = templates.keys().filter(x => x === `${path}/template.html`)[0];

        var controller = controllers(controllerPath);
        var template = templates(templatePath);

        app.directive(name, () => {
            return {
                restrict: 'E',
                controller,
                template
            }
        });
    }, this);
};

function createServices({ services }) {
    services.keys().forEach(function(servicePath) {
        var name = servicePath.split('/')[1].split('.')[0];
        var service = services(servicePath);

        app.service(name, service);
    }, this);
}

function requireStylesheets(requireContext) {
  return requireContext.keys().map(requireContext);
}

var controllers = require.context("./components", true, /^\.\/.*\.js$/);
var templates = require.context("./components", true, /^\.\/.*\.html$/);

var services = require.context("./services", true, /^\.\/.*\.js$/);

createServices({ services });
createComponents({ controllers, templates });

var stylesheets = require.context("./components", true, /^\.\/.*\.less$/);

requireStylesheets(stylesheets);

app.config(routes);

app.config(config);

app.run(run);
