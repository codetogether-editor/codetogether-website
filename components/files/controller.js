module.exports = function ($scope, Editor, $rootScope, $mdSidenav, Files) {
    $scope.files = Files.get();

    $scope.findFileMetaByName = Files.findFileMetaByName;

    $scope.changeFile = async function (file) {
        var meta = $scope.findFileMetaByName(file.fileName);

        var editor = await Editor.get();
        editor.getSession().setMode(`ace/mode/${meta.name}`);

        $rootScope.$emit('fileChange', { file, meta });
        
        $mdSidenav('files').close();
    };
}