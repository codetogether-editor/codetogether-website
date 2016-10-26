module.exports = function ($scope, $rootScope, $mdSidenav) {
    $scope.fileName = 'main.js'
    
    $scope.openFilesMenu = () => {
        $mdSidenav('files').open();
    }

    $rootScope.$on('fileChange', (e, args) => {
        $scope.fileName = args.file.fileName;
    });
}