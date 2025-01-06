const { QueryTypes } = require("sequelize")
const { sequelize } = require("../configs/database.config")

const rawQueryFrameHelper = async (query) => {
    return await sequelize.query(
        query,
        {
            type : QueryTypes.SELECT
        }
    )
}

module.exports.rawQueryFrameHelper = rawQueryFrameHelper;