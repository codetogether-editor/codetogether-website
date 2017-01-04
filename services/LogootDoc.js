module.exports = function (Observable, $window) {
    var SHOW_LOGS = false // huge performance impact
    var sessionId = null
    var observable = new Observable()
    var loogotDoc
    var algorithm

    observable.init = (sessionId) => {
        loogotDoc = new Document()
        $window.LOG = loogotDoc
        algorithm = new Algorithm(loogotDoc, sessionId)
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

        if(SHOW_LOGS) loogotDoc.showDetailedSessionState("INS")
    }

    observable.remove = ({startIndex, endIndex}) => {
         var delCmd = algorithm.remove(startIndex + 1, endIndex)
         var command = {
             type: 'emitDel',
             ids: delCmd.ids
         }
         observable.next(command)

         if(SHOW_LOGS) loogotDoc.showDetailedSessionState("REM")
    }

    observable.add = ({string, firstCharId}) => {
        var baseObj = new Base(firstCharId.base.main, firstCharId.base.sessionId, firstCharId.base.clock)
        var charIdObj = new CharId(baseObj, firstCharId.offset)
        var changes = algorithm.add(string, charIdObj);
        for(var change of changes){
            var command = {
                type: 'add',
                index: change.position, 
                value: change.string
            }
            observable.next(command)
        }

        if(SHOW_LOGS) loogotDoc.showDetailedSessionState("ADD")
    }

    observable.del = ({ids}) => {
        ids = ids.map(i => new CharId(new Base(i.base.main, i.base.sessionId, i.base.clock), i.offset))
        var  changes = algorithm.del(ids);
        for(var change of changes){
            var command = {
                type: 'del',
                fromIndex: change.from,
                toIndex: change.to + 1
            }
            observable.next(command)
        }

        if(SHOW_LOGS) loogotDoc.showDetailedSessionState("DEL")
    }
    
    return observable;
}