module.exports = function (Observable, Connection, LogootDoc) {
    var observable = new Observable();
    var channel;

    observable.create = (fileId) => {
        channel = Connection.createChannel(`file:${fileId}`);
        channel.on('event', command => observable.next(command.data));
    };

    observable.send = (data) => {
        if (!channel) {
            return;
        }

        channel.push('event', { data }, 10000)
            .receive('ok', (msg) => console.log('created message', msg))
            .receive('error', (reasons) => console.log('create failed', reasons))
            .receive('timeout', () => console.log('Networking issue...'));
    };

    return observable;
};