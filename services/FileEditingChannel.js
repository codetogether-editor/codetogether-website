module.exports = function (Observable, Connection, LogootDoc, $window) {
    var observable = new Observable();
    var io = $window.io;

    var socket = io.connect('http://localhost:3000');
    //var socket = io.connect('http://063f5e69.ngrok.io');

    socket.on('remoteCommand', (command) => {
        console.log(command);
        LogootDoc[command.type](command);
    });

    console.log('FileEditing instantiated!');

    // Connection.subscribe((command) => {
    //     LogootDoc[command.type](command);
    // });

    LogootDoc.subscribe((command) => {
        var allowedCommands = ['emitAdd', 'emitDel'];
        if (allowedCommands.indexOf(command.type) === -1) {
            return;
        }

        var remoteCommand = {};
        angular.copy(command, remoteCommand);

        remoteCommand.type = remoteCommand.type.replace('emit', '').toLowerCase(); // e.g. 'emitAdd' to 'add'

        socket.emit('remoteCommand', remoteCommand);

        // console.log(command);
    });

    return observable;
};