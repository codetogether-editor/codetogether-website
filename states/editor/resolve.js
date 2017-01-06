module.exports = {
    initFileManager: ($state, Files) => {
        return async () => {
            await Files.fetch();
        }
    },
    getId: ($state) => () => {
        return $state.params.id;
    }
};