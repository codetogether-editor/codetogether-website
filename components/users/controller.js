module.exports = function ($scope, $rootScope) {
    $scope.currentUser = $rootScope.user;

    $rootScope.$watch('user', (user) => {
        $scope.currentUser = user;
    });
}