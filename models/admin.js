const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    "foodName": {
        "type": "string",
        "required": true
      },
      "quantity": {
        "type": "string",
        "required": true
      },
      "createTillNow": {
        "type": "string",
        "required": true
      },
      "predicted": {
        "type": "string",
        "required": true
      },
      "status": {
        "type": "string",
        "required": true
      }

},
    { timestamps: true }
)

module.exports = mongoose.model("Mentor",adminSchema)