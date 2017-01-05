module.exports = function ($resource) {
    var userApiUrl = `http://${App.cfg.endpoint}/user`;

    return $resource(userApiUrl);
}