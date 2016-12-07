var sampleFiles = require('../dummyData/files');

module.exports = function ($rootScope, Observable) {
    var current = null;
    var files = null;
    var observable = new Observable();

    observable.fetch = () => {
        files = sampleFiles;
    };

    observable.get = () => {
        if (!files) {
            observable.fetch();
        }

        return files;
    };

    observable.getCurrent = () => current;

    observable.setCurrent = (id) => {
        var file = files.filter(x => x.id === id)[0];
        current = file;

        var meta = observable.findFileMetaByName(file.fileName);

        observable.next({ file, meta });
    };

    observable.findFileMetaByName = (fileName) => {
        var ext = fileName.split('.');
        ext = ext[ext.length - 1];

        return App.cfg.extensions.filter(x => x.ext === ext)[0] || App.cfg.extensions.filter(x => x.ext === '*')[0];
    };

    observable.add = (fileName) => {
        // send file to the server and then add response data to files

        var simulateServerResponse = () => {
            return { fileName, content: '', id: `${Math.random()}` };
        }

        var file = simulateServerResponse();

        files.push(file);
        observable.setCurrent(file.id);
    };

    return observable;
}