module.exports = function ($scope, Files) {
    $scope.link = `http://127.0.0.1:8080/file/${Files.getCurrent().id}`;
}