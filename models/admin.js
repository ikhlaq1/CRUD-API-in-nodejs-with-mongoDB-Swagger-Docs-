const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    "mentorName": {
        "type": "string",
        "required": true
      },
      "Gender": {
        "type": "string",
        "required": true
      },
      "AgeYears": {
        "type": "string",
        "required": true
      },
      "description": {
        "type": "string",
        "required": true
      },
      "tasks": {
        "type": [
          "string"
        ],
        "required": true
      },
      "status": {
        "type": "string",
        "required": false
      },
      "ActivityLevel": {
        "type": "string",
        "required": true
      }

},
    { timestamps: true }
)

module.exports = mongoose.model("Mentor",adminSchema)