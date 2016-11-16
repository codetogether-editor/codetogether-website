module.exports = function ($scope, $mdDialog) {
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
}