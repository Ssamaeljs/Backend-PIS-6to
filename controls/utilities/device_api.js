const URL_API = "https://computacion.unl.edu.ec/uv/api/";

const dispositivos_api = async () => {
  try {
    var dispositivos;
    const dispositivosResponse = await fetch(`${URL_API}listar`);
    const data1 = await dispositivosResponse.json();
    dispositivos = data1.dispositivos;

    var mediciones;
    const medicionesResponse = await fetch(`${URL_API}medicionDispositivos`);
    const data2 = await medicionesResponse.json();
    mediciones = data2.ultimasMediciones;

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
    return dispositivos;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = dispositivos_api;
