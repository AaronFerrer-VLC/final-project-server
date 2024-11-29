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
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
