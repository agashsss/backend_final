const {Schema, model} = require('mongoose');

const Product = new Schema({
    name: {type: String, required: true},
    category: {type: String},
    price: {type: Number, required: true, get: getPrice, set: setPrice}
})

function setPrice(num) {
    return (num/100).toFixed(2);
}

function getPrice(num) {
    return num * 100;
}

module.exports = model('Product', Product)