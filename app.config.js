var netAddress = require('./app.defaults').netAddress;
var clientId = environment === 'production' ? '74976130c11c77b38e5e' : '71ddcc9794861ae7b9e1';

module.exports = function ($authProvider) {
    $authProvider.github({
        clientId,
        redirectUri: `${netAddress}/authenticating`,
        url: `http://${App.cfg.endpoint}/auth/github`
    });

    $authProvider.httpInterceptor = true;
}