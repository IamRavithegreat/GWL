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
    points: {
      type: Number,
      default: 0,
    },
    employee: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
          },
        ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmployeeNotification", notificationSchema);
