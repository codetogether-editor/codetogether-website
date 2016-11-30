module.exports = function ($scope, $rootScope, Editor, Files) {

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

    $scope.language = 'JavaScript';

    Files.subscribe((args) => {
        $scope.language = args.meta.display;
    });
}