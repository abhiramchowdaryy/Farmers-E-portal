import mongoose from 'mongoose';

const biddingSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    createdOn: { type: Date, default: Date.now() },
    product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product', unique: true },
    status: { type: String, default: 'Active' },
    biddings: [
      {
        user: {
          type: Object,
        },
        price: {
          type: Number,
        },
        date: { type: Date },
        comment: { type: String },
      },
    ],
    winner: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Bidding = mongoose.model('Bidding', biddingSchema);

export default Bidding;
