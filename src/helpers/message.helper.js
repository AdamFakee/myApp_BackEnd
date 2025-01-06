
const code200 = (res, data={}, message="success") => {
    return res.status(200).json({
        code: 200,
        message : message,
        data
    });
}
const code404 = (res, data={}, message="not found") => {
    return res.status(404).json({
        code: 404,
        message : message,
        data
    });
}

const code400 = (res, data={}, message="bad request") => {
    return res.status(400).json({
        code: 400,
        message : message,
        data
    });
}

const code500 = (res, data={}, message="Internal Server Error") => {
    return res.status(400).json({
        code: 400,
        message : message,
        data
    });
}

module.exports.messageHelper = {
    code200, code404, code400, code500
}