module.exports = ($scope, Editor) => {
    $scope.editorCfg = angular.extend(App.cfg.editor, { onLoad: Editor.set });

    $scope.document = `export default {\n\ttest: () => {\n\t\tconsole.log('this is a test');\n\t}\n}`;
}