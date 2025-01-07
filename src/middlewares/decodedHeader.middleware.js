const { messageHelper } = require("../helpers/message.helper");
const { jwtService } = require("../services/jwt.service");

const decodeHeader = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers.authorization || req.body.token
    if (!token) {
        return messageHelper.code401(res);
    }
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length)
        if (!token || token === '')  return messageHelper.code401(res);
    }
    // call the verifyJWT method to verify the token is valid
    const decoded = jwtService.verifyJWT(token);
    if (!decoded) return messageHelper.code401(res);
    // attach the decoded token to the res.user object
    if (decoded) res.customer = decoded
    res.token = token
    next()
}

module.exports.decodeHeaderMiddleware = {
    decodeHeader
}