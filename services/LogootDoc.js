module.exports = function () {
    var sessionId = null
    var aceEditor = null
    var docChanger = null
    var observable = new Observable()

    observable.init = (sessionId, aceEditor) => {
        var loogotDoc = new Document()
        var algorithm = new Algorithm(loogotDoc, sessionId)
        var docChanger = new DocumentChanger(algorithm, aceEditor)
    }

    observable.loadDoc = (remoteCommands) => {
        for(var cmd of remoteCommands)
            if(cmd.type == 'add')
                observable.add(cmd.str, cmd.firstCharId)
            else
                observable.del(cmd.ids)
    }

    observable.insert = ({start, lines}) => {
        var addCmd = docChanger.performInsertAndGetAddCmd(str, line, column)
        var command = {
            type: 'emitAdd',
            string: addCmd.str,
            firstCharId: addCmd.id
        }
        observable.next(command)
    }

    observable.remove = ({start, lines}) => {
         var delCmd = docChanger.performRemoveAndGetDelCmd(start.row, start.column, lines)
         var command = {
             type: 'emitDel',
             ids: delCmd.ids
         }
         observable.next(command)
    }

    observable.add = (str, firstCharId) => {
        var changes = docChanger.addAndGetChanges(str, firstCharId);
        for(var change of changes){
            var command = {
                type: 'add',
                position:{
                    line: change.position.line,
                    column: change.position.column
                },
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
                range:{
                    from:{
                        line: change.from.line,
                        column: change.from.column
                    },
                    to:{
                        line: change.to.line,
                        column: change.to.column
                    }
                }
            }
            observable.next(command)
        }
    }
    
    return observable;
}