module.exports = function ($rootScope, $mdSidenav, Editor) {
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
}