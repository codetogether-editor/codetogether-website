module.exports = function ($scope, $rootScope, $mdSidenav, Files) {
    $scope.fileName = 'main.js'
    console.log($rootScope.user);
    $scope.openFilesMenu = () => {
        $mdSidenav('files').open();
    }

    Files.subscribe((args) => {
        $scope.fileName = args.file.fileName;
    });
}