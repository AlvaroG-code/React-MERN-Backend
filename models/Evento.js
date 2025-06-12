const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
});

// Personalizar el nombre del modelo y la representación JSON
EventoSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id; // Renombrar _id a id
    return object;
});

module.exports = model("Evento", EventoSchema);
