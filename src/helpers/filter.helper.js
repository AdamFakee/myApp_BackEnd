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

// seperate object contain img and not
const seperateObjectImage = (data) => {
    const dataFilltered_not_contain_img = [];
    const dataFilltered_contain_img = [];
    const dataChart = {
        1 : {
            cnt : 0,
            total : 0
        },
        2 :{
            cnt : 0,
            total : 0
        },
        3 : {
            cnt : 0,
            total : 0
        },
        4 : {
            cnt : 0,
            total : 0
        },
        5 : {
            cnt : 0,
            total : 0
        }, 
        'info' : {
            cnt : 0,
            total : 0,
            avg : 0
        }
    }
    data.forEach(item => {
        const {star} = item;
        if (dataChart[star]) {
            dataChart[star].cnt += 1; 
            dataChart[star].total += star; 

            // update info
            dataChart['info'].cnt += 1;
            dataChart['info'].total += star;
        }
        // contain img
        if(item.imgArray) {
            const imgArray = item.imgArray;
            if(imgArray.startsWith('[') && imgArray.endsWith) {  // img save array that is converted by json
                const imgs = item.imgArray;
                dataFilltered_contain_img.push({
                    ...item, imgArray : JSON.parse(imgs)
                });
            } else { 
                const imgs = imgArray.split(', ');
                dataFilltered_contain_img.push({
                    ...item, imgArray : imgs
                });
            }
        } else {
            dataFilltered_not_contain_img.push(item);
        }
    })

    // cnt avg
    dataChart['info'].avg = (dataChart['info'].total / dataChart['info'].cnt).toFixed(2);

    return {dataFilltered_contain_img, dataFilltered_not_contain_img, dataChart};
}

// change array[object[string]] to array[string]
const changeToArrayString = (data) => {
    const result = [];
    data.forEach(item => {
        for(let key in item) {
            const valueObj = item[key];
            if(key) {
                result.push(valueObj);
            }
        }
    })
    return result;
}
module.exports.filterHelper = {
    removeFieldFromOneObject, mergeImageDetailItem, calculateNewPrice, seperateObjectImage, changeToArrayString
}