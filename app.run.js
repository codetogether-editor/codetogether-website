module.exports = async function ($rootScope, $mdSidenav, $state, Editor, CurrentUser, Connection, $auth, NotAuthenticatedState, Files, FileRes, ngNotify) {
    $rootScope.$mdSidenav = $mdSidenav;

    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            if (toState.name !== 'authenticating' && !$auth.isAuthenticated()) {
                NotAuthenticatedState.set({ fromState, fromParams });
                $state.go('login');
            }
        });

    if ($auth.isAuthenticated()) {
        var currentUserData = await CurrentUser.get().$promise;
        $rootScope.user = currentUserData.user;
    }

    $rootScope.$apply();
}