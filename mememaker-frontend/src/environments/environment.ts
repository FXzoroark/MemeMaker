export const environment = {
    production: false,
    backend: {
        protocol: 'http',
        host: '0.0.0.0',
        port: '3000',
        endpoints: {
            base: '',
            allBlanks: '/memes/blanks',
            blankCanvas: '/blank',
            allMemes: '/memes',
            oneMeme: '/memes/:id',
            uploadMeme: '/files/upload'

        }
    }
};