module.exports = function ($scope, $rootScope, Editor, $state, $stateParams, Files) {
    $scope.editorCfg = angular.extend(App.cfg.editor, { onLoad: Editor.set });

    $scope.document = `export default {\n\ttest: () => {\n\t\tconsole.log('this is a test');\n\t}\n}`;

    $rootScope.$on('fileChange', async (e, args) => {
        $scope.document = args.file.content;
        var meta = Files.findFileMetaByName(args.file.fileName);

        var editor = await Editor.get();
        editor.getSession().setMode(`ace/mode/${meta.name}`);
    });

    if ($stateParams.id) {
        Files.setCurrent($stateParams.id);
    }
}