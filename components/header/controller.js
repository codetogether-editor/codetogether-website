module.exports = function ($scope, $rootScope, $mdSidenav, Files, $auth, $state) {
    $scope.fileName = '';

    $scope.openFilesMenu = () => {
        $mdSidenav('files').open();
    };

    $scope.logout = () => {
        $auth.logout();
        $state.go('login');
    };

    Files.subscribe((args) => {
        $scope.fileName = args.file.fileName;
    });
}