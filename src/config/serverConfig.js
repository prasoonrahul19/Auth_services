const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

console.log("running at port :" ,process.env.PORT);

module.exports = {
    PORT : process.env.PORT,

    SALT : bcrypt.genSaltSync(10)
}




