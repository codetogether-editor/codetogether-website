module.exports = function ($scope, $mdSidenav) {
    $scope.openFilesMenu = () => {
        $mdSidenav('files').open();
    }
}