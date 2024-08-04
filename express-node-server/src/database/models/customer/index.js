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

db.customer = require("./customer.js")(sequelize, Sequelize);

// Include a sync option with seed data logic included.
db.sync = async () => {
    // Sync schema.
    await db.sequelize.sync();

    // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
    // await db.sequelize.sync({ force: true });
    // console.log('assync is not called');
    await seedData();
};

async function seedData() {
    const count = await db.customer.count();
    // Only seed data if necessary.
    console.log("Customers are there : " + count);
    if (count > 0)
        return;

    await db.customer.create({
        title: "Alan Linto",
        username: "alanlinto004",
        email: "alanlinto@gmail.com",
        password: "ehhj3hjhjjhswh9_jkdj@",
        date: "2023 - 05 - 04"
    });
    await db.customer.create({
        title: "Samuel Chan",
        username: "samchan010",
        email: "samuelchan@gmail.com",
        password: "2wjej4j^jdj*kd9",
        date: "2020 - 04 - 23"
    });
}
module.exports = db;