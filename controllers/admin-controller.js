const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const foodModel = require('../models/admin')

exports.getFood = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 6;
    return foodModel.find()
        .countDocuments()
        .then(count => {
            console.log({ count })
            foodModel.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .then(foods => {
                    res.status(200).json({
                        message: "food fetched",
                        foods: foods,
                    })
                })
                .catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err)
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })


};



exports.postFood = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    
    const foodName = req.body.foodName;
    const quantity = req.body.quantity;
    const createTillNow = req.body.createTillNow;
    const predicted = req.body.predicted;
    const status = req.body.status;
    const food = new foodModel({
        foodName: foodName,
        quantity: quantity,
        createTillNow: createTillNow,
        predicted: predicted,
        status: status
    });
    food.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Food Added Successfully!",
            })
        })
        .catch(err => {
            console.log(err)
        })
};

exports.updateFood = (req, res, next) => {
    foodModel.findByIdAndUpdate(
        // the id of the item to find
        req.params.foodId,
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },
        // the callback function

    ).then(food => {
        if (!food) {
            const error = new Error("No Food Found");
            error.statusCode = 404;
            throw error
        }
        res.status(200).json({
            message: "Food Item updated succesfully",
            food: food
        })
    }).catch(err => {
        console.log(err)

        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

}

exports.deleteFood = (req, res, next) => {
    const foodId = req.params.foodId;

    foodModel.findByIdAndRemove(foodId, function (err) {
        if (err) return next(err);
        res.status(200).json({
            message: "Food deleted succesfully",
        })
    })


}