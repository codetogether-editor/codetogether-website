module.exports = async function ($scope, $state, initFileManager, getId, FileRes, FileEditingChannel, LogootDoc, $mdMedia, Files, Connection, $auth) {
    $scope.$mdMedia = $mdMedia;
    var id = getId();

    var handleFile = async function (id) {
        try {
            await FileRes.get({ id }).$promise;
            await initFileManager();
            Files.setCurrent(id);
        }
        catch (e) {
            console.error(e);
            $state.go('editor');
        }
    };

    Connection.connect();

    await initFileManager();

    if (id) {
        await handleFile(id);
    }

    FileEditingChannel.subscribe(command => LogootDoc[command.type](command));

    LogootDoc.subscribe((command) => {
        var allowedCommands = ['emitAdd', 'emitDel'];

        if (allowedCommands.indexOf(command.type) === -1) {
            return;
        }

        var remoteCommand = {};
        angular.copy(command, remoteCommand);

        remoteCommand.type = remoteCommand.type.replace('emit', '').toLowerCase(); // e.g. 'emitAdd' to 'add'

        FileEditingChannel.send(remoteCommand);
    });
};