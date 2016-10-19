module.exports = ($scope, Editor) => {
    $scope.editorCfg = App.cfg.editor;

    $scope.document = `export default function () {
        console.log('this is a test');
    }`;
}