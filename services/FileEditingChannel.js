module.exports = function (Observable, Connection, LogootDoc, $window) {
    var observable = new Observable();
    var io = $window.io;

    var socket = io.connect('http://localhost:3000');

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
        command.type = command.type.replace('emit', '').toLowerCase(); // e.g. 'emitAdd' to 'add'

        socket.emit('remoteCommand', command);

        // console.log(command);
    });

    return observable;
};