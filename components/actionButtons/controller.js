module.exports = function ($scope, $mdDialog) {
    var shareDialog = { 
        template: require('./dialogs/share/template.html'),
        controller: require('./dialogs/share/controller.js')
    };
    
    $scope.createFile = () => {

    };

    $scope.share = () => {
        $mdDialog.show(shareDialog);
    };
}