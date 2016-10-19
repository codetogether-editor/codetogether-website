module.exports = function ($scope, Editor) {
    
    var setCursorObserver = async function () {
        var editor = await Editor.get();
        
        editor.getSession().selection.on('changeCursor', (e) => {
            var position = editor.getSession().selection.getCursor();
            $scope.row = position.row + 1;
            $scope.column = position.column + 1;

            $scope.$apply();
        });
    }

    setCursorObserver();
}