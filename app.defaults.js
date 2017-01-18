var netAddress = environment === 'production' ? 'https://code-together.herokuapp.com' : 'http://127.0.0.1:8080';

module.exports = {
    netAddress,
    endpoint: 'api.codetogether.muskala.eu',
    editor: {
        theme: 'idle_fingers'
    },
    extensions: [
        {
            ext: 'js',
            display: 'JavaScript',
            name: 'javascript'
        },
        {
            ext: 'java',
            display: 'Java',
            name: 'java'
        },
        {
            ext: 'cs',
            display: 'C#',
            name: 'csharp'
        },
        {
            ext: 'html',
            display: 'HTML',
            name: 'html',
            icon: 'html5'
        },
        {
            ext: 'css',
            display: 'CSS',
            name: 'css',
            icon: 'css3'
        },
        {
            ext: '*',
            display: 'Plain Text',
            name: 'text',
            icon: 'atom'
        }
    ]
}