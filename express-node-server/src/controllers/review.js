const db = require('../database/models/review/index');
const db_customer = require('../database/models/customer/index');
const { where } = require('sequelize');

exports.postReview = async (req, res) => {
    const { customerId, productId, rating, body } = req.body;

    const response = await db.review.create({
        customerId: customerId,
        productId: productId,
        rating: rating,
        body: body
    });

    if (response) {
        res.json(response);
    }
    else {
        res.json({ statusCode: 404 });
    }
};

exports.fetchAll = async (req, res) => {
    const productId = req.params.id;
    const response = await db.review.findAll({
        where: {
            productId: productId
        }
    });
    const reviews = response.map(item => item.dataValues);
    const result = [];
    for (let review of reviews) {

        const temp = {};
        temp.id = review.id;
        const custom = await db_customer.customer.findByPk(review.customerId);
        temp.customer = custom.dataValues.title;
        temp.rating = review.rating;
        temp.body = review.body;
        result.push(temp);
    }
    // console.log(result);
    res.json(result);
};

exports.one = async (req, res) => {
    const { customerId, productId } = req.params;
    const response = await db.review.findOne({
        where: { customerId: customerId, productId: productId }
    })
    res.json(response);
};

exports.delete = async (req, res) => {
    const { customerId, productId } = req.params;

    try {
        const review = await db.review.findOne({
            where: { customerId: customerId, productId: productId }
        });

        if (review) {
            await review.destroy();
            res.json({ statusCode: 504 });
        } else {
            res.status(404).json({ statusCode: 404 });
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        res.json({ message: 500 });
    }
};

exports.update = async (req, res) => {
    const { customerId, productId, rating, body } = req.body;

    const review = await db.review.findOne({
        where: { customerId: customerId, productId: productId }
    });

    if (review) {
        await review.update({ rating: rating, body: body });
        res.json({ statusCode: 504 });
    }
    else {
        res.json({ statusCode: 404 });
    }
};

