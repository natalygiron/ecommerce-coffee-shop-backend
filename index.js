const app = require('./app');

const port = 3800;
const dbURL = `mongodb+srv://natalygirona:hkN2bK90vA1TZKlM@mycluster.ijclir9.mongodb.net/test`;
const mongoose = require('mongoose');

mongoose.connect(dbURL)
        .then( () => {
            console.log(`\x1b[35m Conexión a la DB satisfactoria \x1b[37m`);
            app.listen(port, ()=>{
                console.log(`\x1b[36m Servidor funcionando en puerto ${port} \x1b [37m`)
            })
        })
        .catch( (error) => {
            console.log(error);
        })



// const http = require('http');
// const host = '127.0.0.1'

// function index(req, res) {
//     res.writeHead(200, { 'Content-Type' : 'text/plain' });
//     res.end('Bienvenido a mi servidor');
// }

// function notFound(req, res) {
//     res.writeHead(404, { 'Content-Type' : 'text/plain' });
//     res.end('La ruta que busca no existe');
// }

// const server = http.createServer((request, response) => {

//     console.log(request.url);
    
//     switch(request.url) {
//         case '/':
//             return index(request, response);
//         default:
//             return notFound(request, response);
//     }

// });

// server.listen(port, host, () => {
//     console.log(`\x1b[32m Servidor funcionando en el puerto: ${port} \  `)
// })
