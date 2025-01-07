// remove specific field form one object
const removeFieldFromOneObject = (data, fields) => {
    const result = {...data};
    fields.forEach((field) => {
        delete result[field];
    });
    return result;
};

// merge image when join table to see detail item
const mergeImageDetailItem = (data) => {
    const images = [];
    const {image, ...itemFilltered} = data[0];
    data.forEach(product => {
        if(product.image) {
            images.push(product.image);
        }
    });
    itemFilltered['images'] = images;
    return itemFilltered;
}

module.exports.filterHelper = {
    removeFieldFromOneObject, mergeImageDetailItem
}