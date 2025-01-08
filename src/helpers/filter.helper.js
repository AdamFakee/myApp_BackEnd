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

// caculate new price
const calculateNewPrice = (products) => {
    return products.map(product => {
        const { price, discount } = product;
    
        // Tính newPrice nếu discount > 0, ngược lại giữ nguyên giá hiện tại
        const newPrice = discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price;
    
        return {
            ...product,
            newPrice : parseFloat(newPrice), // Thêm thuộc tính oldPrice vào sản phẩm
        };
    });
}
module.exports.filterHelper = {
    removeFieldFromOneObject, mergeImageDetailItem, calculateNewPrice
}