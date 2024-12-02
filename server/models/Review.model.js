const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    movieApiId: {
      type: String
    },
    content: {
      type: String,
      required: [true, 'Escribe tu reseña']
    },
    rate: {
      type: Number,
      required: [true, 'Deja tu valoración'],
      min: 0,
      max: 10,
      default: 0
    },
    likesCounter: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
