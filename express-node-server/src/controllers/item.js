const db = require("../database/models/item/index");

exports.all = async (req, res) => {
    const cartItems = await db.cartItem.findAll();

    res.json(cartItems);
};


exports.one = async (req, res) => {
    const customerId = req.params.customerId;
    try {
        const cartItems = await db.cartItem.findAll({
            where: { customerId: customerId }
        });

        res.json(cartItems);
    }
    catch (error) {
        res.json({ message: "Failed to retreive cart items" });
    }
};

exports.addItem = async (req, res) => {

    const { customerId, productId, quantity } = req.body;
    try {
        const cartItem = await db.cartItem.findOne({
            where: { customerId: customerId, productId: productId }
        });

        if (cartItem) {
            //Updating the cart item with same product id with the qty.
            const updatedQuantity = cartItem.quantity + quantity;
            await cartItem.update({ quantity: updatedQuantity });
            res.json(cartItem);
        }
        else {
            const newItem = await db.cartItem.create({
                customerId: customerId,
                productId: productId,
                quantity: quantity
            });

            res.json(newItem);
        }

    }
    catch (error) {
        res.json({ message: 'Error operating the cart' });
    }

};

exports.deletebyId = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await db.cartItem.findByPk(id);

        if (item) {
            await item.destroy();
            res.json({ message: "Cart item has been destroyed" });
        }
        else {
            res.json({ message: "No cart item found with this id" });
        }
    }
    catch (error) {
        res.json({ message: "Error deletting the cart item" });
    }
};

exports.updateItemQty = async (req, res) => {
    const { id, qty } = req.body;
    const item = await db.cartItem.findByPk(id);
    if (item) {
        await item.update({ quantity: qty });
        res.json({ message: "Item quantity updated" });
    }
    else {
        res.json({ message: "Item qty not updated" });
    }
};