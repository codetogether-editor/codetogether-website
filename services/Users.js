module.exports = function ($resource) {
    var userApiUrl = `http://${App.cfg.endpoint}/users/:id`;

    return $resource(userApiUrl);
}