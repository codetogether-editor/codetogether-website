module.exports = function ($http, $auth) {
    var userApiUrl = 'https://api.codetogether.muskala.eu/user';
    var token = $auth.getToken();
    var user = null;

    async function get() {
        if (!user) {
            user = await $http.get(userApiUrl).$promise;
        }

        return user;
    }

    return { get };
}