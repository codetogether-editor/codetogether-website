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
    
    $scope.createFile = () => {
        $mdDialog.show(createFileDialog);
    };

    $scope.share = () => {
        $mdDialog.show(shareDialog);
    };

    Files.subscribe((args) => {
        $scope.currentFile = args.file;
    });
}