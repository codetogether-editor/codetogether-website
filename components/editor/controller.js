module.exports = function ($scope, $rootScope, Editor, $state, $stateParams, Files, $window, $timeout) {
    $scope.editorCfg = angular.extend(App.cfg.editor, { onLoad: Editor.set });

    // $scope.document = `export default {\n\ttest: () => {\n\t\tconsole.log('this is a test');\n\t}\n}`;

    Files.subscribe(async (args) => {
        var { file, meta } = args;

        $scope.file = file;
        $scope.document = file.content;

        var editor = await Editor.get();
        editor.getSession().setMode(`ace/mode/${meta.name}`);

        var Range = ace.require("ace/range").Range
        erroneousLine = editor.session.addMarker(new Range(0, 0, 1, 5), "sampleHighlight", "fullLine");
    });

    if ($stateParams.id) {
        Files.setCurrent($stateParams.id);
    }
}