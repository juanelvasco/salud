const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MedicalTestSchema = Schema(
  {
    nombre: { type: String, required: true },
    archivos: { type: Array },
  },
  {
    timestamps: { createdAt: "creacion", updatedAt: "ultimaModificacion" },
  }
);

module.exports = MedicalTestSchema;
