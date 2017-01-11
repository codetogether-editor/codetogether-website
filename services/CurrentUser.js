module.exports = function ($resource) {
    var userApiUrl = `http://${App.cfg.endpoint}/user/:id`;

    return $resource(userApiUrl);
}