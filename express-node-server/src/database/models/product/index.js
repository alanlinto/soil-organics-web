const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.product = require("./product.js")(sequelize, Sequelize);

// Include a sync option with seed data logic included.
db.sync = async () => {
    // Sync schema.
    await db.sequelize.sync();

    // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
    // await db.sequelize.sync({ force: true });

    await seedData();
};

async function seedData() {
    const count = await db.product.count();
    // Only seed data if necessary.
    console.log("Products are there : " + count);
    if (count > 0)
        return;

    await db.product.create({
        title: "Orange",
        description: "Our own produced fresh organic oranges",
        cost: 12.99,
        image: "https://via.placeholder.com/150",
        type: "standard"
    });
    await db.product.create({
        title: "Grapes",
        description: "Our own produced fresh organic grapes.",
        cost: 7.99,
        image: "https://via.placeholder.com/150",
        type: "standard"
    });
}
module.exports = db;