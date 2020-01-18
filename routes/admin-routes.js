const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const foodController = require('../controllers/admin-controller');

  /**
 * @swagger
 * /api/food:
 *  get:
 *    description: Get all the foods from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: foods fetched successfully.
 */
router.get('/food', foodController.getFood);

/**
 * @swagger
 * /api/food:
 *  post:
 *    description: Use to add food in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add food
 *        description: Add food in DB.
 *        schema:
 *          type: object
 *          required:
 *            - foodName
 *            - quantity
 *          properties:
 *            foodName:
 *              type: string
 *            quantity:
 *              type: string
 *            createTillNow:
 *              type: string
 *            predicted:
 *              type: string
 *            status:
 *              type: string
 *    responses:
 *      '200':
 *        description: Food added successfully.
 */
router.post('/food',[
    check('foodName').trim().isLength({min:1}),
    check('quantity').trim().isLength({min:1})
],foodController.postFood);
 /**
 * @swagger
 * /api/food/{foodId}:
 *  put:
 *    description: Used to update food in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: foodId        
 *      - in: body
 *        name: Update Food
 *        description: Update food in DB.
 *        schema:
 *          type: object
 *          required:
 *            - foodName
 *            - quantity
 *          properties:
 *            foodName:
 *              type: string
 *            quantity:
 *              type: string
 *            createTillNow:
 *              type: string
 *            predicted:
 *              type: string
 *            status:
 *              type: string
 *    responses:
 *      '200':
 *        description: Food item updated successfully.
 */
router.put('/food/:foodId', foodController.updateFood);
/**
 * @swagger
 * /api/food/{foodId}:
 *  delete:
 *    description: Removes food item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: foodId
 *        description: Remove Food Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - foodId
 *          properties:
 *            foodId:
 *              type: string
 *    responses:
 *      '200':
 *        description: Food removed successfully.
 */





router.delete('/food/:foodId', foodController.deleteFood);


module.exports = router;  