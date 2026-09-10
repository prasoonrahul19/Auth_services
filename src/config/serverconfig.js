const dotenv = require('dotenv');

const bcrypt = require('bcrypt');

dotenv.config();

module.exports = {
    PORT : process.env.PORT,

    SALT : bcrypt.genSaltSync(10),
    AUTH_SECRET: process.env.AUTH_SECRET || 'development-secret-change-me'
}
