module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define("cartItem", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false
            // references: {
            //     model: "customs",
            //     key: "id"
            // }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        timestamps: false
    });

    return CartItem;
};