module.exports = function ($scope, $rootScope, $mdSidenav, Files, $auth, $state, $mdMedia) {
    $scope.$mdMedia = $mdMedia;
    
    $scope.fileName = '';

    $scope.openFilesMenu = () => {
        $mdSidenav('files').open();
    };

    $scope.openUsersMenu = () => {
        $mdSidenav('users').open();
    };

    $scope.logout = () => {
        $auth.logout();
        $state.go('login');
    };

    Files.subscribe((args) => {
        $scope.fileName = args.file.fileName;
    });
}