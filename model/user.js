const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    contacts: [
      {
        contactId: {
          type: Schema.Types.ObjectId,
          required: true,
          auto: true
        },
        name: { type: String, require: true },
        mobile: [{ type: String, require: true }],
        email: { type: String, require: true }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
