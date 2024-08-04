module.exports = (express, app) => {
    const controller = require("../controllers/review.js");
    const router = express.Router();

    // Get Reviews
    router.get('/:id', controller.fetchAll);

    // Posting a Review
    router.post('/post', controller.postReview);

    router.get('/one/:customerId/:productId', controller.one);

    router.delete('/delete/:customerId/:productId', controller.delete);

    router.put('/edit', controller.update);
    // Add routes to server.
    app.use("/api/reviews", router);
};