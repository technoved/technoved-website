const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceType: { type: String, required: true },
    budget: { type: String },

    status: {
      type: String,
      enum: ['New', 'In Progress', 'Completed'],
      default: 'New'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', QuoteSchema);
