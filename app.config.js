module.exports = function ($authProvider) {
    $authProvider.github({
        clientId: '71ddcc9794861ae7b9e1',
        redirectUri: 'http://127.0.0.1:8080/',
        url: `http://${App.cfg.endpoint}/auth/github`
    });

    $authProvider.httpInterceptor = true;
}