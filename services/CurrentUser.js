module.exports = function ($http, $auth, $q) {
    var userApiUrl = `http://${App.cfg.endpoint}/user`;
    var token = $auth.getToken();
    var user = null;
    var deferred = $q.defer();

    async function get() {
        $http.get(userApiUrl).then((res) => {
            user = res.data.user;
            deferred.resolve(user);
        });

        return deferred.promise;
    }

    return { get };
}