module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("customer", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    return Customer;
};
