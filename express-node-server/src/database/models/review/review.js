module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("review", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    }, {
        timestamps: false
    });

    return Review;
};
