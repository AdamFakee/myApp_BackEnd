const { RAW } = require("sequelize/lib/query-types");
const { customerModel } = require("../models/customer.model")

// create customer
const createCustomer = async (data) => {
    return await customerModel.create(data);
}

// get one customer
const getOneCustomer = async (data) => {
    const {accountName} = data;
    return await customerModel.findOne({
        where : {
            accountName : accountName,
        },
        raw : true
    });
}

module.exports.customerService = {
    createCustomer, getOneCustomer
}