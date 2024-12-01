const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'El email de usuario es obligatorio'],
      minlength: [5, 'El email necesita mínimo 5 caracteres']
    },
    password: {
      type: String,
      required: [true, 'La contraseña de usuario es obligatoria'],
    },
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio'],
      minlength: [3, 'El usuario necesita mínimo 3 caracteres']
    },
    avatar: {
      type: String,
    },
    firstName: {
      type: String,
    },
    familyName: {
      type: String,
    },
    socialNetworksProfiles: {
      type: [String],
    },
    bio: {
      type: String,
    },
    favoriteGenres: {
      type: [String],
      validate: {
        validator: genres => genres.length >= 3,
        message: 'Selecciona al menos tres géneros'
      }
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: 'USER'
    },
    communities: [{
      type: Schema.Types.ObjectId,
      ref: 'Community'
    }]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User