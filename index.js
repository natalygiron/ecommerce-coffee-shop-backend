const app = require('./app');

require('dotenv').config();

const port = process.env.PORT;
const dbURL = process.env.MONGO_URL;

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

