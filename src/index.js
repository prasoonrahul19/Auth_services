const express = require('express');

const { PORT } = require('./config/serverConfig')

const app = express();

const preapreAndStartServer = () => {

    app.listen(PORT,()=>{
        console.log(`server started at : ${PORT}`);
    });
}

preapreAndStartServer();