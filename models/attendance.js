const { data } = require("jquery");
const moment = require("moment")
const mongoose = require("mongoose");
const User = require("../models/user");
const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
     
    },

    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
  }, {
  timestamps: true,
  toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

attendanceSchema.virtual("formattedDate").get(function() {
  const date = this.date;
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return formattedDate;
});

attendanceSchema.virtual("formattedTime").get(function() {
  const date = this.date;
  const formattedTime= date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return formattedTime
});

//  creating models or collections
const attendance = mongoose.model("attendance", attendanceSchema);

module.exports = attendance;
