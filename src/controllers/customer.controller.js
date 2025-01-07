const { filterHelper } = require("../helpers/filter.helper");
const { messageHelper } = require("../helpers/message.helper");
const { customerService } = require("../services/customer.service");
const { jwtService } = require("../services/jwt.service");

// [POST] /customer/register  - register [FE]
const register = async (req, res) => {
  const {accountName, fullName, accountPass} = req.body;
  const {hash, salt} = jwtService.hashPassword(accountPass);
  try {
    // refomat
    let customer = await customerService.createCustomer({accountName, fullName, accountPass : hash, salt : salt});
    customer= customer.toJSON();

    // generate token
    const payload = {
      accountName
    }
    const accessToken = jwtService.generateJWT(payload);
    const refreshToken = jwtService.generateJWT(payload);

    // get specific field
    const fields = ['salt', 'accountPass']
    const customerFilltered = filterHelper.removeFieldFromOneObject(customer, fields)
    const data = {
      customer : customerFilltered, accessToken, refreshToken
    };
    return messageHelper.code200(res, data, 'register successfully');
  } catch (error) {
    return messageHelper.code400(res, {}, error.message);
  }
}

// [POST] /customer/login  - login [FE]
const login = async (req, res) => {
  const {accountName, accountPass} = req.body;
  try {
    const customer = await customerService.getOneCustomer({accountName});
    if(!customer) {
      return messageHelper.code404(res, {}, 'not found user with account name');
    }
    // conpare password
    const isPassword = jwtService.comparePassword(accountPass, customer.accountPass, customer.salt);
    if(!isPassword) {
      return messageHelper.code400(res, {}, 'wrong password');
    } 

    // generate token
    const payload = {
      accountName
    }
    const accessToken = jwtService.generateJWT(payload);
    const refreshToken = jwtService.generateJWT(payload);

    // get specific field
    const fields = ['salt', 'accountPass']
    const customerFilltered = filterHelper.removeFieldFromOneObject(customer, fields)

    const data = {
      customer : customerFilltered, accessToken, refreshToken
    };
    return messageHelper.code200(res, data, 'login successfully');
  } catch (error) {
    return messageHelper.code400(res, {}, error.message);
  }
}
module.exports.customerController = {
  register, login
}