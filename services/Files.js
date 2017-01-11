var sampleFiles = require('../dummyData/files');

module.exports = function ($rootScope, Observable, CurrentUser, FileRes) {
    var current = null;
    var files = [];
    var observable = new Observable();

    observable.get = async () => {
        var currentUserData = await CurrentUser.get().$promise;
        files = currentUserData.user.files;

        return files;
    };

    observable.getCurrent = () => current;

    observable.setCurrent = (id) => {
        var file = files.filter(x => x.id === id)[0];
        current = file;

        var meta = observable.findFileMetaByName(file.name);

        observable.next({ file, meta });
    };

    observable.findFileMetaByName = (fileName) => {
        var ext = fileName.split('.');
        ext = ext[ext.length - 1];

        return App.cfg.extensions.filter(x => x.ext === ext)[0] || App.cfg.extensions.filter(x => x.ext === '*')[0];
    };

    observable.add = async (fileName) => {
        // send file to the server and then add response data to files
        var payload = {
            file: {
                name: fileName
            }
        };

        var res = await FileRes.save({}, payload).$promise;
        var file = res.file;

        files.push(file);
        observable.setCurrent(file.id);
    };

    return observable;
}