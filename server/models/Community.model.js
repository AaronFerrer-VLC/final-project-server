const { Schema, model, SchemaType } = require("mongoose");

const communitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Selecciona un nombre para tu comunidad'],
      minlength: [3, 'El nombre de la comunidad debe tener al menos 3 caracteres']
    },
    description: {
      type: String,
      required: [true, 'Haz una descripción de la comunidad'],
      minlength: [50, 'Describe la comunidad en al menos 50 caracteres']
    },
    cover: {
      type: String,
      required: [true, 'Selecciona una foto de portada para la comunidad']
    },
    genres: {
      type: [String],
      required: [true, 'Selecciona al menos un género de películas para la comunidad'],
      validate: {
        validator: genres => genres.length >= 1,
        message: 'Selecciona al menos un género de películas para la comunidad'
      }
    },
    fetishDirectors: {
      type: [String],
      required: [true, 'Selecciona los directores fetiche de la comunidad'],
      validate: {
        validator: directors => directors.length >= 1,
        message: 'Selecciona al menos 1 director/a'
      }
    },
    fetishActors: {
      type: [String],
      required: [true, 'Selecciona los actores/actrices fetiche de la comunidad'],
      validate: {
        validator: actors => actors.length >= 1,
        message: 'Selecciona al menos 1 actor/actriz'
      }
    },
    decades: {
      type: [Number],
      required: [true, 'Selecciona las décadas de cine favoritas de la comunidad'],
      validate: {
        validator: decades => decades.length >= 1,
        message: 'Selecciona al menos 1 década'
      }
    },
    moviesApiIds: {
      type: [String]
    },
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    owner: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
);

const Community = model("Community", communitySchema);

module.exports = Community;
