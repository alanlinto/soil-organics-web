module.exports = (express, app) => {
    const controller = require("../controllers/item");
    const router = express.Router();

    router.get("/", controller.all);

    router.get("/:customerId", controller.one);

    router.post("/addItem/", controller.addItem);

    router.put("/updateItemQty/", controller.updateItemQty);

    router.delete("/:id", controller.deletebyId);

    app.use("/api/cartItems", router);
};