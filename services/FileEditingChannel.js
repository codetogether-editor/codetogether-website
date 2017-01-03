module.exports = function (Observable, Connection, LogootDoc) {
    var observable = new Observable();

    console.log('FileEditing intantiated!');

    // Connection.subscribe((command) => {
    //     LogootDoc[command.type](command);
    // });

    LogootDoc.subscribe((change) => {
        var allowedCommands = ['emitAdd', 'emitDel'];
        console.log(change);
    });

    return observable;
};