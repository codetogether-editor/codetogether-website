module.exports = function () {
    
    function createEmptyDocument(sessionId){
        var document = new Document()
        algorithm = new Algorithm(new Document(), sessionId)
    }

    function openDocument(document){

    }
    

    function insert(str, pos){
        var addCommandData = algorithm.insert(str, pos)
        // sendCommandToOtherSessions(addCommandData)
    }

    function remove(fromPos, toPos){
        var delCommandData = algorithm.remove(fromPos, toPos)
        // sendCommandToOtherSessions(delCommandData)
    }

    function executeRemoteCommand(cmd){
        if(cmd.type == "add")
            algorithm.add(cmd.str, cmd.id)
        else
            algorithm.del(cmd.ids)
    }


    return { createEmptyDocument, insert, remove, executeRemoteCommand };
}