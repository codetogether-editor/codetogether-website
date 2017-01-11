module.exports = function ($auth, $window) {
    var Phoenix = $window.Phoenix;
    var socket;
    var channel;

    var address = `ws://${App.cfg.endpoint}/socket`;

    var connect = () => {
        var connectionData = {
            params: {
                token: $auth.getToken()
            }
        };

        socket = new Phoenix.Socket(address, connectionData);
        socket.connect();
    }

    var createChannel = (name, params = {}) => {
        if (channel) {
            channel.leave();
        }

        channel = socket.channel(name, params);
        channel.join();

        return channel;
    }

    var getChannel = () => channel;

    return { connect, createChannel, getChannel };
}