module.exports = function ($rootScope, $q) {
    var $scope = $rootScope.$new();
    $scope.editor = null;

    $scope.isEditorSet = $q.defer();

    $scope.$watch('editor', () => {
        if ($scope.editor) {
            $scope.isEditorSet.resolve($scope.editor);
        }
    });

    return {
        get: () => {
            return $scope.isEditorSet.promise;
        },
        set: (editorInstance) => {
            $scope.editor = editorInstance;
        },
        reset: () => {
            $scope.isEditorSet = $q.defer();
            $scope.editor = null;
        }
    }
}