module.exports = (sequelize, DataType) => {
    const Product = sequelize.define("product", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false
        },
        description: {
            type: DataType.TEXT,
            allowNull: false
        },
        cost: {
            type: DataType.FLOAT,
            allowNull: false
        },
        image: {
            type: DataType.STRING,
            allowNull: false
        },
        type: {
            type: DataType.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Product;
};
