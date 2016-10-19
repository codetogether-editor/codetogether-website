var app = require('./app.module');
var appCfg = require('./app.cfg');
var run = require('./app.run');
var less = require('./assets/less/style.less');

window.App = app; 
app.cfg = appCfg; // global settings

function createComponents({ controllers, templates }) {
    controllers.keys().forEach(function (controllerPath) {
        var name = controllerPath.split('/')[1];
        var path = controllerPath.substr(0, controllerPath.lastIndexOf('/'));
        var templatePath = templates.keys().filter(x => x.includes(path))[0];

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

var controllers = require.context("./components", true, /^\.\/.*\.js$/);
var templates = require.context("./components", true, /^\.\/.*\.html$/);

var services = require.context("./services", true, /^\.\/.*\.js$/);

createServices({ services });
createComponents({ controllers, templates });

app.run(run);
