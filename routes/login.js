const express = require("express");
const { fileParser } = require("express-multipart-file-parser");
const { addUser, uploadImage } = require("../lib/dbfunctions");
const { jwtSign } = require("../lib/authentication");

const router = express.Router();

const config = {
  rawBodyOptions: {
    limit: "15mb" //file size limit
  },
  busboyOptions: {
    limits: {
      fields: 20 //Number text fields allowed
    }
  }
};

// generador de UUID shortid
const uuid = require("shortid");

// Caracteres a Usar , eliminado los Signos por que No son tomados como parte de la URL por algunas Apps
uuid.characters(
  "0123456789abcdefghijklmn@opqrstuvwxyzABCDEFGHIJKLMN&OPQRSTUVWXYZ"
);

router.post("/", fileParser(config), async (req, res, next) => {
  try {

    console.log('in login route');
    let uid = uuid.generate();

    const [file] = req.files;

    let imgUrl = await uploadImage(file, uid);

    // Doc Item
    const data = {
      uid: uid,
      name: req.body.name,
      email: req.body.email,
      imgUrl: imgUrl
    };

    // Add Item FS
    await addUser("prueba-627ea", uid, data);

    console.log("depues de addUser");

    const token = jwtSign({ uid: uid });

    console.log("token " +token);

    res.locals.code = 200;
    res.locals.mensaje = "usuario creado";
    res.header("x-auth-token", token);

    console.log('antes de ir al response');
    next();
  } catch (e) {
    next(e);
  }
});

module.exports.login = router;