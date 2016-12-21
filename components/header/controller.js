module.exports = function ($scope, $rootScope, $mdSidenav, Files) {
    $scope.fileName = '';

    $scope.openFilesMenu = () => {
        $mdSidenav('files').open();
    }

    Files.subscribe((args) => {
        $scope.fileName = args.file.fileName;
    });
}