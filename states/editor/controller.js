module.exports = function ($state, initFileManager, getId, FileRes) {
    async function handleFile(id) {
        try {
            await FileRes.get({ id }).$promise;
            Files.setCurrent(id);
        }
        catch (e) {
            $state.go('editor');
        }
    };

    initFileManager();

    var id = getId();

    if (id) {
        handleFile(id);
    }
};