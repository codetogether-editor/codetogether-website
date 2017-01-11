module.exports = {
    initFileManager: ($state, Files) => {
        return async () => {
            await Files.get();
        }
    },
    getId: ($state) => () => {
        return $state.params.id;
    }
};