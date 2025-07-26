const { Schema, default: mongoose } = require("mongoose");

const eventSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  details: {
    type: String,
    required: [true, "Details is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  interested_ids: {
    type: Array,
    required: false,
  },
  going_ids: {
    type: Array,
    required: false,
  },
  swags: {
    type: Array,
    required: false,
  },
});

export const EventModel =
  mongoose.model.events ?? mongoose.model("events", eventSchema);
