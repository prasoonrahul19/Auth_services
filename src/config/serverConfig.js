const dotenv = require('dotenv');

dotenv.config();

console.log("running at port :" ,process.env.PORT);

module.exports = {
    PORT : process.env.PORT
}




