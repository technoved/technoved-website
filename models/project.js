const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    serviceType: { type: String, required: true },

    status: {
      type: String,
      enum: ['Active', 'Completed', 'On Hold'],
      default: 'Active'
    },

    deadline: { type: Date },
    notes: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
