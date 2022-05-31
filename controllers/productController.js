const productModel = require('../models/Product');

exports.create = async (req, res) => {
    if (!req.body.name && !req.body.category && !req.body.price) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    const product = new productModel({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
    });

    await product.save().then(data => {
        res.send({
            message:"product posted successfully!!",
            product:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating product"
        });
    });
};



exports.getAllproducts = async (req, res) => {
    try {
        const product = await productModel.find();
        res.status(200).json(product);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        res.status(200).json(product);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await productModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Product not found.`
            });
        }else{
            res.send({ message: "Product updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.delete = async (req, res) => {
    await productModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Product not found.`
            });
        } else {
            res.send({
                message: "Product deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};