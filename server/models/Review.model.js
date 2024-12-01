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
      required: [true, 'Deja tu valoración']
    },
    likesCounter: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
