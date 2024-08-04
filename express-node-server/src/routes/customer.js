module.exports = (express, app) => {
    const controller = require("../controllers/customer.js");
    const router = express.Router();

    // Select all users.
    router.get("/", controller.all);

    // Select a single user with id.
    router.get("/:id", controller.one);

    // Select a single user with username.
    router.get("/:username", controller.onebyusername);

    // Create a new user.
    router.post("/", controller.create);

    // // Update a user with id.
    router.put("/:id", controller.update);

    // // Delete a user with id.
    router.delete("/:id", controller.remove);

    // Sign Up Feature
    router.post("/signup/", controller.signup);

    // Sign In Feature
    router.post("/signin/", controller.signin);

    // Add routes to server.
    app.use("/api/customers", router);
};