module.exports = function ($scope, $rootScope, FileRes, Files, $mdMedia) {
    $scope.$mdMedia = $mdMedia;
    
    $scope.currentUser = $rootScope.user;
    $scope.users = [];
    var file = Files.getCurrent();
    
    if ($scope.file) {
        $scope.users = file.users;
    }

    $rootScope.$watch('user', (user) => {
        $scope.currentUser = user;
    });

    Files.subscribe(async (file) => {
        var id = file.id;
        var file = await FileRes.get({ id }).$promise;
        $scope.users = file.users;
    });
}