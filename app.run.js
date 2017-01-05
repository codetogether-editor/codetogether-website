module.exports = async function ($rootScope, $mdSidenav, $state, Editor, CurrentUser, Connection, $auth, NotAuthenticatedState) {
    $rootScope.$mdSidenav = $mdSidenav;

    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            if (toState.name !== 'authenticating' && !$auth.isAuthenticated()) {
                NotAuthenticatedState.set({ fromState, fromParams });
                // $state.go('login');
            }
        });

    if ($auth.isAuthenticated()) {
        var currentUserData = await CurrentUser.get().$promise;
        $rootScope.user = currentUserData.user;

        // Phoenix test

        Connection.connect();
        Connection.createChannel('ping');

        var channel = Connection.getChannel();
        channel.join();

        channel.on('pong', (msg) => {
            console.log(msg);
        });

        channel.push('ping', { msg: 'pong' }, 10000)
            .receive("ok", (msg) => console.log("created message", msg))
            .receive("error", (reasons) => console.log("create failed", reasons))
            .receive("timeout", () => console.log("Networking issue..."))
    }

    $rootScope.$apply();

    console.log($rootScope.user);
}