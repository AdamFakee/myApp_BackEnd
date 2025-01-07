const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const fs = require('fs')

const privateKEY = fs.readFileSync('./src/key/private.key', 'utf8')
const publicKEY = fs.readFileSync('./src/key/public.key', 'utf8') 

const verifyOptions = {
    expiresIn: '24h',
    algorithm: ['RS256'],
}
const signOptions = {
    expiresIn: '24h',
    algorithm: 'RS256',
}
const saltRounds = 10;

const generateSalt = () => {
    return bcrypt.genSaltSync(saltRounds)
};

const generateJWT = (payload) => {
    const options = signOptions;
    return jwt.sign(payload, privateKEY, options);
}

const verifyJWT = (payload) => {
    const options = verifyOptions;
    try {
        return jwt.verify(payload, publicKEY, options);
    } catch (err) {
        return null
    }
}

const hashPassword = (password) => {
    const salt = generateSalt();
    const hash = bcrypt.hashSync(password, salt);
    return {hash, salt};
}
const comparePassword = (passwordFromInput, accountPass, salt) => {
    const hashPasswordFromInput = bcrypt.hashSync(passwordFromInput, salt);
    return hashPasswordFromInput == accountPass;
}
module.exports.jwtService = {
    hashPassword, verifyJWT, generateJWT, comparePassword, generateSalt
}