module.exports = function ($scope, $mdDialog, Files) {
    $scope.currentFile = Files.getCurrent();

    var shareDialog = { 
        template: require('./dialogs/share/template.html'),
        controller: require('./dialogs/share/controller.js')
    };

    var createFileDialog = { 
        template: require('./dialogs/createFile/template.html'),
        controller: require('./dialogs/createFile/controller.js')
    };
    
    var dialogOptions = {
        clickOutsideToClose: true
    };

    $scope.createFile = () => {
        $mdDialog.show(angular.extend(createFileDialog, dialogOptions));
    };

    $scope.share = () => {
        $mdDialog.show(angular.extend(shareDialog, dialogOptions));
    };

    Files.subscribe((args) => {
        $scope.currentFile = args.file;
    });
}
