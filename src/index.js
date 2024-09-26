const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig')

const apiRoutes = require('./routes/index');

const UserService = require('./services/user-service');

// const UserRepository = require('./repository/user-repository');



 const app = express();

const preapreAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,async()=>{
        console.log(`server started at : ${PORT}`);
        // const repo = new UserRepository();
        // const response = await repo.getById(1);
        // console.log(response);
        const services = new UserService();
//    ###################### creating a token #####################################
        
        // const newToken = services.createToken({email : 'rahu@gmail.com' , id:1});
        // console.log("token",newToken);

// ####################### Verifing a token ######################

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcyNzM2MzA4OCwiZXhwIjoxNzI3NTM1ODg4fQ.0zfvR0J5QARwveorK9Tk0JFpzcHRx9Jo5ZALY66b5QM';
        const response =  services.verifyToken(token);
        console.log(response); 
        
    });
}

preapreAndStartServer();