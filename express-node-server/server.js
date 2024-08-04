const express = require('express');
const cors = require("cors");
// const session = require('express-session');
// const crypto = require('crypto');
const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Generate a random secret key
// const secretKey = crypto.randomBytes(32).toString('hex');

// app.use(session({
//     secret: secretKey,
//     resave: false,
//     saveUninitialized: false
// }));

const db_customer = require("./src/database/models/customer/index.js");
const db_product = require("./src/database/models/product/index.js");
const db_cartItem = require("./src/database/models/item/index.js");
const db_review = require("./src/database/models/review/index.js");

// Defining the entity relationships........
db_customer.customer.hasMany(db_cartItem.cartItem, { foreignKey: 'customerId' });
db_customer.customer.hasMany(db_review.review, { foreignKey: 'customerId' });
db_cartItem.cartItem.belongsTo(db_customer.customer, { foreignKey: 'customerId' });
db_review.review.belongsTo(db_customer.customer, { foreignKey: 'customerId' });

db_customer.sync();
db_product.sync();
db_cartItem.sync();
db_review.sync();

db_product.product.hasMany(db_cartItem.cartItem, { foreignKey: 'productId' });
db_product.product.hasMany(db_review.review, { foreignKey: 'productId' });
db_cartItem.cartItem.belongsTo(db_product.product, { foreignKey: 'productId' });
db_review.review.belongsTo(db_product.product, { foreignKey: 'productId' });

app.get('/', (req, res) => {
    res.json({ "song": "Hypnotize", "album": "Hypnotize", "artist": "System of a Down" });
});

// app.get('/api/auth', (req, res) => {
//     let userId = req.session.userId;
//     // console.log('UserId : ' + userId);
//     if (!userId) {
//         userId = "Not Signed In";
//     }
//     res.json({ message: userId });
// });

require("./src/routes/customer.js")(express, app);
require("./src/routes/product.js")(express, app);
require("./src/routes/item.js")(express, app);
require("./src/routes/review.js")(express, app);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
