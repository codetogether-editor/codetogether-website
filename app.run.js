module.exports = async function ($rootScope, $mdSidenav, $state, Editor, CurrentUser, Connection) {
    async function configureEditor() {
        var editor = await Editor.get();
        editor.getSession().setMode("ace/mode/javascript");
        editor.setOptions({
            fontFamily: "Consolas",
            fontSize: "14px"
        });
    }

    configureEditor();

    $rootScope.$mdSidenav = $mdSidenav;

    $rootScope.user = await CurrentUser.get();

    if (!$rootScope.user) {
        $state.go('login');
    }

    $rootScope.$apply();

    // Phoenix test

    Connection.connect();
    Connection.createChannel('ping');

    var channel = Connection.getChannel(); 
    channel.join();

    channel.on('pong', (msg) => {
        console.log(msg);
    });

    channel.push('ping', {msg: 'pong'}, 10000)
        .receive("ok", (msg) => console.log("created message", msg) )
        .receive("error", (reasons) => console.log("create failed", reasons) )
        .receive("timeout", () => console.log("Networking issue...") )
}