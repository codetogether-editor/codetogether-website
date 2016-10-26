module.exports = ($scope, $rootScope, Editor, $state) => {
    $scope.editorCfg = angular.extend(App.cfg.editor, { onLoad: Editor.set });

    $scope.document = `export default {\n\ttest: () => {\n\t\tconsole.log('this is a test');\n\t}\n}`;

    $rootScope.$on('fileChange', (e, args) => {
        $scope.document = args.file.content;
    });
}