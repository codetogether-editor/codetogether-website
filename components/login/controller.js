module.exports = function ($scope, $auth, ngNotify, $state) {
    $scope.authenticate = async function () {
        try {
            var auth = await $auth.authenticate('github');
            $state.go('editor');
        }
        catch(e) {
            ngNotify.set('Authorization failed!', 'error');
        }
    }
}