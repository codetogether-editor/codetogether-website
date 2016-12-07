module.exports = function ($auth, $window, Observable) {
    var Phoenix = $window.Phoenix;
    var observable = new Observable;
    var socket;
    var channel;

    var address = `ws://${App.cfg.endpoint}/socket`;
    var connectionData = {
        params: {
            token: $auth.getToken() 
        }
    };

    var connect = () => {
        socket = new Phoenix.Socket(address, connectionData);
        socket.connect();
    }

    var createChannel = (name, params = {}) => {
        channel = socket.channel(name, params);
    }

    var getChannel = () => channel;

    return { connect, createChannel, getChannel };
}