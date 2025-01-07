
const removeFieldFromOneObject = (data, fields) => {
    const result = {...data};
    fields.forEach((field) => {
        delete result[field];
    });
    return result;
};

module.exports.filterHelper = {
    removeFieldFromOneObject
}