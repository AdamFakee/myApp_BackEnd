// random token
const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    let result = "";
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  };
// End random token
// [POST] /user/register
module.exports.userRegister = async (req, res) => {
    console.log(req.body)
    req.body.token = generateRandomString(8);
    const newAcc = new Account(req.body);
    await newAcc.save();
    res.status(200).json({
        code : 200,
        user : newAcc
    })
}

// [POST] /user/login
module.exports.userLogin = async (req, res) => {
    console.log(req.body)
    const user = await Account.findOne({
        email : req.body.email,
        password : req.body.password
    })
    res.status(200).json({
        code : 200,
        user : user
    })
}