module.exports = function () {
    var sessionId = null
    var docChanger = null
    var observable = new Observable()

    observable.init = (sessionId) => {
        var loogotDoc = new Document()
        var algorithm = new Algorithm(loogotDoc, sessionId)
    }

    observable.loadDoc = (remoteCommands) => {
        for(var cmd of remoteCommands)
            if(cmd.type == 'add')
                observable.add(cmd.str, cmd.firstCharId)
            else
                observable.del(cmd.ids)
    }

    observable.insert = ({startIndex, text}) => {
        var addCmd = algorithm.insert(text, startIndex + 1)
        var command = {
            type: 'emitAdd',
            string: addCmd.str,
            firstCharId: addCmd.id
        }
        observable.next(command)
    }

    observable.remove = ({startIndex, endIndex}) => {
         var delCmd = algorithm.remove(startIndex + 1, endIndex + 1)
         var command = {
             type: 'emitDel',
             ids: delCmd.ids
         }
         observable.next(command)
    }

    observable.add = ({str, firstCharId}) => {
        var changes = algorithm.add(str, firstCharId);
        for(var change of changes){
            var command = {
                type: 'add',
                index: change.position, 
                value: change.string
            }
            observable.next(command)
        }
    }

    observable.del = (ids) => {
        var  changes = docChanger.delAndGetChanges(ids);
        for(var change of changes){
            var command = {
                type: 'del',
                fromIndex: change.from,
                toIndex: change.to
            }
            observable.next(command)
        }
    }
    
    return observable;
}