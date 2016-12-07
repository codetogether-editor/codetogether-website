module.exports = function ($http, $auth, $q) {
    var userApiUrl = 'http://api.codetogether.muskala.eu/user';
    var token = $auth.getToken();
    var user = null;
    var deferred = $q.defer();

    async function get() {
        if (token) {
            $http.get(userApiUrl).then((res) => {
                user = res.data.user;
                deferred.resolve(user);
            });
        }

        return deferred.promise;
    }

    return { get };
}