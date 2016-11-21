var sampleFiles = require('../dummyData/files');

module.exports = function ($rootScope) {
    var current = null;
    var files = null;

    var fetch = () => {
        files = sampleFiles;
    };

    var get = () => {
        if (!files) {
            fetch();
        }

        return files;
    };

    var getCurrent = () => current;

    var setCurrent = (id) => {
        file = files.filter(x => x.id === id)[0];
        current = file;

        var meta = findFileMetaByName(file.fileName);

        $rootScope.$emit('fileChange', { file, meta });
    };

    var findFileMetaByName = (fileName) => {
        var ext = fileName.split('.');
        ext = ext[ext.length - 1];

        return App.cfg.extensions.filter(x => x.ext === ext)[0] || App.cfg.extensions.filter(x => x.ext === '*')[0];
    };

    var add = (fileName) => {
        // send file to the server and then add response data to files

        var simulateServerResponse = () => {
            return { fileName, content: '', id: `${Math.random()}` };
        }

        var file = simulateServerResponse();

        files.push(file);
        setCurrent(file.id);
    };

    return { get, setCurrent, getCurrent, add, findFileMetaByName };
}