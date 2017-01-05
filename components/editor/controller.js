var Range = ace.require('ace/range').Range;

module.exports = async function ($scope, $rootScope, Editor, $state, $stateParams, Files, $window, $timeout, LogootDoc, FileEditingChannel) {
    $scope.editorCfg = angular.extend(App.cfg.editor, { onLoad: Editor.set });
    Editor.reset();

    var editor = await Editor.get();
    var doc = editor.getSession().getDocument();

    function configureEditor() {
        editor.getSession().setMode('ace/mode/javascript');
        editor.setOptions({
            fontSize: '14px'
        });
    }

    configureEditor();

    //temporary solution, sessionIds should be always unique
    var sessionId = Math.floor((Math.random() * 1000) + 1);
    LogootDoc.init(sessionId);

    Files.subscribe(async (args) => {
        var { file, meta } = args;

        $scope.file = file;
        $scope.document = file.content;

        editor.getSession().setMode(`ace/mode/${meta.name}`);
        editor.resize(true); 
    });

    // var addMarker = ({ className, e }) => {
    //     className = className || 'me-highlight';
    //     var range = new Range(e.start.row, e.start.column, e.end.row, e.end.column);

    //     editor.session.addMarker(range, className, 'fullLine', false);
    // };

    doc.on('change', (e) => { 
        var allowedActions = ['insert', 'remove'];
        var userChange = editor.curOp && editor.curOp.command.name;

        if (!userChange || allowedActions.indexOf(e.action) === -1) {
            return;
        }

        var startIndex = doc.positionToIndex(e.start, 0)
        var countChars = (lines) => (lines.reduce((a, b) => a + b.length + 1,0) - 1)

        var change = {
            startIndex: startIndex,
            endIndex: e.action == 'remove' ? startIndex + countChars(e.lines) : null,
            text: e.action == 'insert' ? e.lines.join('\n') : null
        };

        // addMarker({ e })

        LogootDoc[e.action](change);
    });

    LogootDoc.subscribe((command) => {
        var allowedActions = ['add', 'del'];
        if(allowedActions.indexOf(command.type) === -1)
            return;

        var prevCursorPos = doc.positionToIndex(editor.getCursorPosition())
        var newCursorPos = prevCursorPos

        if(command.type == 'add'){
            var position = doc.indexToPosition(command.index);
            doc.insert(position, command.value);
            if(prevCursorPos > command.index)
                newCursorPos = prevCursorPos + command.value.length
            editor.moveCursorToPosition(doc.indexToPosition(newCursorPos))
            
        } else if(command.type == 'del'){
            var fromPos = doc.indexToPosition(command.fromIndex)
            var toPos = doc.indexToPosition(command.toIndex)
            doc.remove(new Range(fromPos.row, fromPos.column, toPos.row, toPos.column))
            if(command.fromIndex < prevCursorPos && command.toIndex < prevCursorPos)
                newCursorPos -= (command.toIndex - command.fromIndex)
            else if(command.fromIndex < prevCursorPos && command.toIndex > prevCursorPos)
                newCursorPos -= (prevCursorPos - command.fromIndex)
            editor.moveCursorToPosition(doc.indexToPosition(newCursorPos))
        }

        //console.log(command);
    });

    if ($stateParams.id) {
        Files.setCurrent($stateParams.id);
    }
}