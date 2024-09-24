const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig')

const apiRoutes = require('./routes/index');

const UserRepository = require('./repository/user-repository');

const app = express();

const preapreAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,async()=>{
        console.log(`server started at : ${PORT}`);
        const repo = new UserRepository();
        const response = await repo.getById(1);
        console.log(response);
    });
}

preapreAndStartServer();