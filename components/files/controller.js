module.exports = function ($scope, Editor, $rootScope, $mdSidenav) {
    var sampleFiles = [
        {
            fileName: 'main.js',
            content: 'function getShiftedOffset(offset, shift) { //if not possible then returns first or last ALPHABET el\n    let shiftedOffsetPos = ALPHABET.indexOf(offset) + shift\n    if (shiftedOffsetPos < ALPH_BEG_POS)\n        return ALPH_BLANK\n    if (shiftedOffsetPos > ALPH_END)\n        return ALPH_END\n    else\n        return ALPHABET[shiftedOffsetPos]\n}'
        },
        {
            fileName: 'test.java',
            content: `/******************************************************************************
 *  Compilation:  javac HelloWorld.java
 *  Execution:    java HelloWorld
 *
 *  Prints "Hello, World". By tradition, this is everyone's first program.
 *
 *  % java HelloWorld
 *  Hello, World
 *
 *  These 17 lines of text are comments. They are not part of the program;
 *  they serve to remind us about its properties. The first two lines tell
 *  us what to type to compile and test the program. The next line describes
 *  the purpose of the program. The next few lines give a sample execution
 *  of the program and the resulting output. We will always include such 
 *  lines in our programs and encourage you to do the same.
 *
 ******************************************************************************/

public class HelloWorld {

    public static void main(String[] args) {
        // Prints "Hello, World" to the terminal window.
        System.out.println("Hello, World");
    }

}`
        },
        {
            fileName: 'styles.css',
            content: `.editor-wrapper {
    position: absolute; 
    height: 100%; 
    width: 100%; 
    top: 0; 
    left: 0; 
    padding-left: 31px; 
    padding-bottom: 30px;
}`
        },
        {
            fileName: 'template.html',
            content: `      <div class="footer" layout="row" layout-align="end center">
    <span class="meta">Ln {{row}}, Col {{column}}</span>
    <span class="meta" layout="row" layout-align="center center">
        {{language}} <i class="material-icons">settings</i>
    </span>
</div>`
        }
    ];

    $scope.files = sampleFiles;

    $scope.findFileMetaByName = (fileName) => {
        var ext = fileName.split('.');
        ext = ext[ext.length - 1];

        return App.cfg.extensions.filter(x => x.ext === ext)[0];
    }

    $scope.changeFile = async function (file) {
        var meta = $scope.findFileMetaByName(file.fileName);

        var editor = await Editor.get();
        editor.getSession().setMode(`ace/mode/${meta.name}`);

        $rootScope.$emit('fileChange', { file, meta });
        
        $mdSidenav('files').close();
    }
}