module.exports = function ($scope, $auth, ngNotify, $state, CurrentUser) {
    $scope.authenticate = async function () {
        try {
            var auth = await $auth.authenticate('github');
            var user = await CurrentUser.get();
            $state.go('editor');
        }
        catch(e) {
            ngNotify.set('Authorization failed!', 'error');
        }
    }
}