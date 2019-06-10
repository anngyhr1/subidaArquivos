const express = require("express");
const {
  addUser,
  getUsers,
  deleteImage,
  deleteUser,
  uploadImage,
  updateUser,
  getUserByDoc
} = require("../lib/dbfunctions");
const {auth} = require('../middleware/auth');
const { fileParser } = require("express-multipart-file-parser");

const router = express.Router();

// generador de UUID shortid
const uuid = require("shortid");

// Caracteres a Usar , eliminado los Signos por que No son tomados como parte de la URL por algunas Apps
uuid.characters(
  "0123456789abcdefghijklmn@opqrstuvwxyzABCDEFGHIJKLMN&OPQRSTUVWXYZ"
);

// Add Item
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

router.post("/", fileParser(config), async (req, res, next) => {
  try {
    let idItem = uuid.generate();

    const [file] = req.files;

    let imgUrl = await uploadImage(file, idItem);

    // Doc Item
    const data = {
      uid: idItem,
      name: req.body.name,
      email: req.body.email,
      imgUrl: imgUrl
    };

    console.log("antes de addUser");
    
    await addUser("prueba-627ea", idItem, data);

    res.locals.code = 200;
    res.locals.mensaje = "usuario creado";

    next();
  } catch (e) {
    next(e);
  }
});

router.put("/", fileParser(config), auth, async (req, res, next) => {
  try {

    const [file] = req.files;
   // const uid = req.body.uid;
    const uid = req.user.uid;

    console.log(`req.user: ${req.user}`);
   
    let data = {
      email: req.body.email
    };

    if (file !== undefined) {
        let imgUrl = await uploadImage(file, uid);
        data.imgUrl = imgUrl;
    }

    const u = await updateUser("prueba-627ea", uid, data);

    res.locals.code = 200;
    res.locals.mensaje = "usuario actualizado";
    next();
  } catch (e) {
    next(e);
  }
});

router.get("/getUsers", async (req, res, next) => {
  try {
    // Add Item FS
    const users = await getUsers();

    res.locals.code = 200;
    res.locals.mensaje = users;
    next();
  } catch (e) {
    next(e);
  }
});

router.delete("/", auth, async (req, res, next) => {
  try {

    const uid = req.user.uid;

    console.log(`uid: ${uid}`);

   const user = await getUserByDoc(uid);

   console.log(`user: ${user}`);
   console.log(`user.imgUrl: ${user.imgUrl}`);

    await deleteUser("prueba-627ea", uid);

    const url = user.imgUrl.split("/");
    const filename = url[url.length - 2] + "/" + url.pop();

    await deleteImage(filename);

    res.locals.code = 200;
    res.locals.mensaje = "usuario eliminado";

    next();
  } catch (e) {
    next(e);
  }
});

module.exports.routeUsuario = router;
