module.exports = function ($scope, $rootScope, Editor, Files) {
    if (Files.getCurrent()) {
        $scope.language = Files.findFileMetaByName(Files.getCurrent().fileName).display;
    }

    $scope.row = 1;
    $scope.column = 1;

    var setCursorObserver = async function () {
        var editor = await Editor.get();

        editor.getSession().selection.on('changeCursor', (e) => {
            var position = editor.getSession().selection.getCursor();
            $scope.row = position.row + 1;
            $scope.column = position.column + 1;

            if (!$scope.$$phase) {
                $scope.$apply();
            }
        });
    }

    setCursorObserver();

    Files.subscribe((args) => {
        $scope.language = args.meta.display;
    });
}