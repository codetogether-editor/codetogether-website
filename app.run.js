module.exports = async function ($rootScope, $mdSidenav, $state, Editor, CurrentUser) {
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

    $rootScope.user = await CurrentUser.get();

    if (!$rootScope.user) {
        $state.go('login');
    }

    $rootScope.$apply();
}