module.exports = function ($scope, Files) {
    $scope.link = `${App.cfg.netAddress}/file/${Files.getCurrent().id}`;
}