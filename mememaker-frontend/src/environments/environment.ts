export const environment = {
    production: false,
    backend: {
        protocol: 'http',
        host: 'localhost',
        port: '3000',
        endpoints: {
            base: '',
            allBlanks: '/memes/blanks',
            blankCanvas: '/blank',
            allMemes: '/memes',
            uploadMeme: '/files/upload',
            login: 'users/login',
            signin: 'users/signin'
        }
    }
};