module.exports = function ($http, $auth) {
    var userApiUrl = 'https://api.github.com/user';
    var token = $auth.getToken();
    var user = null;

    async function get() {
        if (!user) {
            user = await $http({
                url: userApiUrl,
                method: 'GET',
                cache: true
            }).$promise;
        }

        return user;
    }

    return { get };
}