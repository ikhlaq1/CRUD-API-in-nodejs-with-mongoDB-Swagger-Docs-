const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const mentorsController = require('../controllers/admin-controller');


  /**
 * @swagger
 * /api/mentors:
 *  get:
 *    description: Get all the mentors from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: mentors fetched successfully.
 */
router.get('/mentors', mentorsController.getMentor);

/**
 * @swagger
 * /api/mentors:
 *  post:
 *    description: Used to add mentors in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add mentor
 *        description: Add mentor in DB.
 *        schema:
 *          type: object
 *          required:
 *            - mentorName
 *            - description
 *          properties:
 *            mentorName:
 *              type: string
 *            description:
 *              type: string
 *            Gender:
 *              type: string
 *            AgeYears:
 *              type: string
 *            tasks:
 *              type: string
 *            status:
 *              type: string
 *            ActivityLevel:
 *              type: string
 *    responses:
 *      '200':
 *        description: Mentor added successfully.
 */
router.post('/mentors',[
    check('mentorName').trim().isLength({min:1}),
    check('description').trim().isLength({min:1})
],mentorsController.postMentor);
 /**
 * @swagger
 * /api/mentor/{mentorId}:
 *  put:
 *    description: Used to update mentor in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: mentorId        
 *      - in: body
 *        name: Add mentor
 *        description: Add mentor in DB.
 *        schema:
 *          type: object
 *          required:
 *            - mentorName
 *            - description
 *          properties:
 *            mentorName:
 *              type: string
 *            description:
 *              type: string
 *            Gender:
 *              type: string
 *            AgeYears:
 *              type: string
 *            tasks:
 *              type: string
 *            status:
 *              type: string
 *            ActivityLevel:
 *              type: string
 *    responses:
 *      '200':
 *        description: Mentor updated successfully.
 */
router.put('/mentor/:mentorId', mentorsController.updateMentor);
/**
 * @swagger
 * /api/mentor/{mentorId}:
 *  delete:
 *    description: Removes mentor from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: mentorId
 *        description: Removes mentor from DB.
 *        schema:
 *          type: string
 *          required:
 *            - mentorId
 *          properties:
 *            mentorId:
 *              type: string
 *    responses:
 *      '200':
 *        description: mentor removed successfully.
 */





router.delete('/mentor/:mentorId', mentorsController.deleteMentor);


module.exports = router;  