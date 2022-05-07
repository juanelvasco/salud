const Turno = require("../models/turno_model");

class TurnoRepository {
  async getTurnos() {
    return await Turno.find();
  }

  async crearTurno(data) {
    const { fecha, lugar, medico } = data;
    try {
      const turno = await Turno.create({
        fecha,
        lugar,
        medico,
        disponible: true,
      });
      return await turno.save();
    } catch (err) {
      console.log(err);
    }
  }

  async editarTurno(data) {
    const { fecha, lugar, medico } = data;
    try {
      let newData = {};

      newData.fecha = fecha;
      newData.lugar = lugar;
      newData.medico = medico;

      await Turno.findByIdAndUpdate({ _id: id }, newData);

      const turnoStored = await Turno.findById(id);

      return turnoStored;
    } catch (err) {
      console.log(err);
    }
  }

  async asignarTurno(data) {
    const { paciente } = data;
    try {
      let newData = {};

      newData.paciente = paciente;
      newData.disponible = false;

      await Turno.findByIdAndUpdate({ _id: id }, newData);

      const turnoStored = await Turno.findById(id);

      return turnoStored;
    } catch (err) {
      console.log(err);
    }
  }

  async borrarTurno(data) {
    const { id } = data;
    try {
      return await Turno.deleteOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  async getTurnoPorNombreYFecha(data){
    const {fecha, medico} = data;
    let fechaFilter = {fecha}
    let medicoFilter = {medico: { $regex: medico }}

    const turnoFilter = Turno.find({
      $and: [fechaFilter, medicoFilter]
    });

    return turnoFilter
  }
}

module.exports = TurnoRepository;
