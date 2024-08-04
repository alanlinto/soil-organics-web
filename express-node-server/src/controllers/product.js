const db = require("../database/models/product/index");

exports.all = async (req, res) => {
    const products = await db.product.findAll();

    res.json(products);
};

exports.onebyid = async (req, res) => {
    const id = req.params.id;

    try {

        const product = await db.product.findOne({
            where: { id: id }
        });

        if (product) {
            res.json(product);
        } else {
            res.json({ message: "No Match" });
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal server error' }); // Server error, send 500 status code
    }
};