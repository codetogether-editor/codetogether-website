module.exports = async function ($scope, $state, initFileManager, getId, FileRes, FileEditingChannel, LogootDoc, $mdMedia, Files) {
    $scope.$mdMedia = $mdMedia;

    async function handleFile(id) {
        try {
            await FileRes.get({ id }).$promise;
            Files.setCurrent(id);
        }
        catch (e) {
            console.error(e);
            $state.go('editor');
        }
    };

    await initFileManager();

    var id = getId();

    if (id) {
        handleFile(id);
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