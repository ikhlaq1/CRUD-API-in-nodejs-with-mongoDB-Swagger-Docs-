const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const mentorModel = require('../models/admin')

exports.getMentor = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 6;
    let totalItems;
    return mentorModel.find()
        .countDocuments()
        .then(count => {
            console.log({ count })
            totalMentors = count;
            mentorModel.find()
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



exports.postMentor = (req, res, next) => {
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
    const mentor = new mentorModel({
        foodName: foodName,
        quantity: quantity,
        createTillNow: createTillNow,
        predicted: predicted,
    });
    mentor.save()
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

exports.updateMentor = (req, res, next) => {
    mentorModel.findByIdAndUpdate(
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

exports.deleteMentor = (req, res, next) => {
    const mentorId = req.params.foodId;

    mentorModel.findByIdAndRemove(mentorId, function (err) {
        if (err) return next(err);
        res.status(200).json({
            message: "Food deleted succesfully",
        })
    })


    // mentorModel.findById(mentorId)
    //     .then(mentor => {
    //         if (!mentor) {
    //             const error = new Error("No Menotor Found");
    //             error.statusCode = 404;
    //             throw error
    //         }
    //         mentor.remove(mentorId)
    //             .then(res => {
    //                 console.log({res})
    //                 res.status(200).json({
    //                     message: "Mentor deleted succesfully",
    //                     mentor: mentor
    //                 })
    //             })
    //             .catch(err => {
    //                 if (!err.statusCode) {
    //                     err.statusCode = 500
    //                 }
    //                 next(err)
    //             })
    //     })
}