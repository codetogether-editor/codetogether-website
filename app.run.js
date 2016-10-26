module.exports = function ($rootScope, $mdSidenav, $state, Editor) {
    async function configureEditor() {
        var editor = await Editor.get();
        editor.getSession().setMode("ace/mode/javascript");
        editor.setOptions({
            fontFamily: "Consolas",
            fontSize: "14px"
        });
    }

    configureEditor();

    $rootScope.$mdSidenav = $mdSidenav;

    // if (!$rootScope.user) {
    //     $state.go('login');
    // }

    // $rootScope.$on('$stateChangeStart', (event, toState) => {
    //     if (!$rootScope.user && toState.name !== 'login') {
    //         $state.go('login');
    //     }
    // });
}