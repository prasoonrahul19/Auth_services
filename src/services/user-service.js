const UserRepository = require('../repository/user-repository');
const { SALT } = require('../config/serverconfig');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, SALT);
            const user = await this.userRepository.create({
                email: data.email,
                password: hashedPassword
            });
            return user;

        } catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }

    async login(data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            throw error;
        }
        const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
        const payload = Buffer.from(JSON.stringify({ sub: user.id, email: user.email, exp: Math.floor(Date.now() / 1000) + 86400 })).toString('base64url');
        const unsigned = `${header}.${payload}`;
        const signature = crypto.createHmac('sha256', process.env.AUTH_SECRET || 'development-secret-change-me').update(unsigned).digest('base64url');
        return { token: `${unsigned}.${signature}`, user: { id: user.id, email: user.email } };
    }
}

module.exports = UserService
