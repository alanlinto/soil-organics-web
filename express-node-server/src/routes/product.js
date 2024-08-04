module.exports = (express, app) => {
    const controller = require("../controllers/product");
    const router = express.Router();

    // GET all the Products from the Database.
    router.get("/", controller.all);

    // GET product by its ID.
    router.get("/:id", controller.onebyid);

    app.use("/api/products", router);
};