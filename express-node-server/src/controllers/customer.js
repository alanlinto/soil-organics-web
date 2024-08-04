const db = require("../database/models/customer/index");
const bcrypt = require('bcryptjs');

// Select all users from the database.
exports.all = async (req, res) => {
    const customers = await db.customer.findAll();

    res.json(customers);
};

// Select one user from the database.
exports.onebyusername = async (req, res) => {
    const username = req.params.username;

    try {
        // Find the user by username
        const customer = await db.customer.findOne({
            where: { username: username }
        });

        if (customer) {
            res.json(customer); // User found, send user data as JSON response
        } else {
            res.json({ message: "No Match" }); // User not found, send error response
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal server error' }); // Server error, send 500 status code
    }
};

//Adding server-side sign in feature

exports.signin = async (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body);
    try {
        const user = await db.customer.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // req.session.userId = user.id;
            // console.log(req.session.userId);
            return res.status(200).json({ success: true, userId: user.id });
        } else {
            // If passwords don't match, send error response
            return res.status(401).json({ error: 'Invalid username or password.' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
};

// Sign Up feature is implemented here

exports.signup = async (req, res) => {

    const { title, email, username, password, date } = req.body;

    const customers = await db.customer.findAll();
    // console.log(customers.data);
    const hasEmailAndUsername = customers.some(item => {
        return item.email === email || item.username === username;
    });
    // console.log("Message : " + hasEmailAndUsername);
    if (hasEmailAndUsername === true) {
        res.json({ statusCode: 404 })
        return;
    }

    const newCustomer = await db.customer.create({
        title: title,
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 10),
        date: date
    });

    res.json(newCustomer);
};
// Create a user in the database.
exports.create = async (req, res) => {
    const customers = await db.customer.create({
        title: req.body.title,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date
    });

    return res.json(customers);
};


exports.one = async (req, res) => {

    const id = req.params.id;
    const customer = await db.customer.findByPk(id);
    if (customer) {
        res.json(customer);
    } else {
        res.status(404).send("Customer not found");
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const customer = await db.customer.findByPk(id);
    if (customer) {
        customer.update(req.body);
        await customer.save();
        res.json(customer);
    } else {
        res.status(404).send("Customer not found");
    }
};



exports.remove = async (req, res) => {
    const id = req.params.id;
    const customer = await db.customer.findByPk(id);
    if (customer) {
        await customer.destroy();
        res.send("Customer deleted");
    } else {
        res.status(404).send("Customer not found");
    }
};

