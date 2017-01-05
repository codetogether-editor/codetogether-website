module.exports = function ($resource) {
    return $resource(`http://${App.cfg.endpoint}/files/:id`, {});
}