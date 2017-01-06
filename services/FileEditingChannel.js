module.exports = function (Observable, Connection, LogootDoc) {
    var observable = new Observable();
    var connection = Connection.connect();
    var channel;

    observable.create = (fileId) => {
        channel = Connection.createChannel(`file:${fileId}`);
        channel.on('event', data => observable.next(data));
    };

    observable.send = (data) => {
        channel.push('event', data, 10000)
            .receive("ok", (msg) => console.log("created message", msg))
            .receive("error", (reasons) => console.log("create failed", reasons))
            .receive("timeout", () => console.log("Networking issue..."));
    };

    return observable;
};