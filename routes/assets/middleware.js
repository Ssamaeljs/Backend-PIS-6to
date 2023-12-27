const jwt = require("jsonwebtoken");
const models = require("../../models");
const cuenta = models.cuenta;
const peticion_token = models.peticion_token;
require("dotenv").config();
const secretKey = process.env.KEY_LOGIN;

const authenticateToken = (req, res, next) => {
  const token = req.headers["x-api-token"];
  if (!token) {
    return res.status(401).json({
      msg: "Token no proporcionado.",
      code: 401,
    });
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        msg: "Token no válido o expirado.",
        code: 401,
      });
    }

    const aux = await cuenta.findOne({
      where: {
        external_id: decoded.external_token,
      },
    });

    if (!aux) {
      return res.status(401).json({
        msg: "Token no válido o expirado.",
        code: 401,
      });
    }

    req.decoded = decoded;
    next();
  });
};

const authorize = (req, res, next) => {
  const api_key = req.headers["x-api-key"];
  if (!api_key) {
    return res.status(401).json({
      msg: "Api key no proporcionado.",
      code: 401,
    });
  }
  return async (req, res, next) => {
    const token = await peticion_token.findOne({
      where: {
        external_id: api_key,
      },
    });
    if (!token || !token.habilitado) {
      return res.status(401).json({
        msg: "Api key no válido o no habilitado",
        code: 401,
      });
    }
    req.decoded = decoded;
    next();
  };
};

module.exports = {
  authenticateToken,
  authorize,
};
