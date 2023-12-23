const UserController = require("../controls/PersonaController");
const CuentaController = require("../controls/CuentaController");
const TokenController = require("../controls/TokenController");
const DeviceController = require("../controls/DispositivoController");
const MedicionController = require("../controls/MedicionController");
const DispositivoController = require("../controls/DispositivoController");

class Services {
  post(req, res, model) {
    switch (model) {
      case "persona":
        UserController.guardar(req, res);
        break;
      case "cuenta":
        break;
      case "dispositivo":
        break;
      case "medicion":
        break;
      case "peticion_token":
        break;
      default:
        break;
    }
  }

  get(req, res, model) {
    switch (model) {
      case "persona":
        UserController.listar(req, res);
        break;
      case "cuenta":
        break;
      case "dispositivo":
        DeviceController.listar(req, res);
        break;
      case "medicion":
        MedicionController.listar(req, res);
        break;
      case "peticion_token":
        TokenController.listar(req, res);
        break;
      default:
        break;
    }
  }

  post_without_token(req, res, model) {
    switch (model) {
      case "persona":
        break;
      case "cuenta":
        CuentaController.login(req, res);
        break;
      case "dispositivo":
        DispositivoController.guardar(req, res);
        break;
      case "medicion":
        MedicionController.guardar(req, res);
        break;
      case "peticion_token":
        TokenController.guardar(req, res);
        break;
      default:
        break;
    }
  }
}

module.exports = new Services();
