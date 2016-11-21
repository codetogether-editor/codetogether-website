module.exports = function ($scope, Editor, $rootScope, $mdSidenav, Files, $state) {
    $scope.files = Files.get();

    $scope.findFileMetaByName = Files.findFileMetaByName;

    $scope.changeFile = async function (file) {
        Files.setCurrent(file.id);

        $state.go('editor.file', { id: file.id });
        
        $mdSidenav('files').close();
    };
}