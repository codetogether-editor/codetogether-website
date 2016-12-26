module.exports = function ($scope, $auth, ngNotify, $state, $rootScope, CurrentUser) {
    $scope.authenticate = async function () {
        try {
            var auth = await $auth.authenticate('github');            
            var user = await CurrentUser.get();

            $rootScope.user = user;

            $state.go('editor');
        }
        catch(e) {
            ngNotify.set('Authorization failed!', 'error');
        }
    }
}