module.exports = function ($scope, Files, $mdDialog) {
    $scope.createFile = () => {
        Files.add($scope.fileName);

        $mdDialog.hide();
    };
};