module.exports = function ($scope, $rootScope, FileRes, Files, $mdMedia, Users) {
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

    Files.subscribe(async ({ file, meta }) => {
        var id = file.id;
        var res = await FileRes.get({ id }).$promise;
        var file = res.file;

        $scope.users = [];

        for (var i in file.users) {
            var id = file.users[i];
            var userData = await Users.get({ id }).$promise;
            var user = userData.user;

            var containsUser = $scope.users.filter(x => x.id === user.id).length;

            if (!containsUser) {
                $scope.users.push(userData.user);
            }
        }
    });
}