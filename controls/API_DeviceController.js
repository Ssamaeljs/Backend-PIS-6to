const URL_API = "https://computacion.unl.edu.ec/uv/api/";
const axios = require("axios");
class API_DeviceController {
  async listar(req, res) {
    try {
      var dispositivos;
      await fetch(`${URL_API}listar`).then((info) =>
        info.json().then((data) => {
          dispositivos = data.dispositivos;
        })
      );
      var mediciones;
      await fetch(`${URL_API}medicionDispositivos`).then((info) =>
        info.json().then((data) => {
          mediciones = data.ultimasMediciones;
        })
      );
      dispositivos = dispositivos.map((device) => {
        const deviceMedicion = mediciones.find(
          (medicion) => medicion.nombre === device.nombre
        );
        if (deviceMedicion) {
          device.medicion = deviceMedicion.medicions;
        } else {
          device.medicion = [
            {
              uv: 0,
              fecha: "No hay mediciones",
            },
          ];
        }
        return device;
      });

      return res.status(200).json({
        msg: "Dispositivos",
        code: 200,
        info: dispositivos,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Ha ocurrido un error en el servidor",
        code: 500,
      });
    }
  }
}
module.exports = new API_DeviceController();
