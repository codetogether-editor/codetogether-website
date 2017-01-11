module.exports = async function ($scope, Editor, $rootScope, $mdSidenav, Files, $state) {
    $scope.files = await Files.get();

    $scope.findFileMetaByName = Files.findFileMetaByName;

    $scope.changeFile = async function (file) {
        Files.setCurrent(file.id);
        $mdSidenav('files').close();
    };

    Files.subscribe(async (file) => {
        $scope.files = await Files.get();
    });
}