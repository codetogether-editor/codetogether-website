module.exports = function ($scope, $auth, ngNotify, $state, $rootScope, CurrentUser, NotAuthenticatedState) {
    $scope.authenticate = async function () {
        try {
            var { toState, toParams } = NotAuthenticatedState.get();
            var auth = await $auth.authenticate('github');
            var user = await CurrentUser.get();

            $rootScope.user = user;

            var toStateName = toState ? toState.name : 'editor';
            $state.go(toStateName, toParams);
        }
        catch (e) {
            console.error(e);
            ngNotify.set('Authorization failed!', 'error');
        }
    }
}