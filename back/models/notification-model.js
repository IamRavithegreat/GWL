const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    notificationDescription: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    customers: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
          },
        ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
