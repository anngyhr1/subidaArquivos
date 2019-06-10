const { Firebase } = require("./firebase");
const { error } = require("../startup/winston");

const addUser = async (coll, doc, data) => {
  try {
      console.log('in addUser');
    const { db } = Firebase.getConnection();

    return await db
      .collection(coll)
      .doc(doc)
      .set(data);
  } catch (e) {
    throw error(e, null, null, null);
  }
};

const getUsers = async coll => {
  try {
    const { db } = Firebase.getConnection();

    // Get Doc's
    const r = await db
      .collection("prueba-627ea")
      //    .doc('usuario')
      .get();

    return r.docs.map(doc => doc.data());
  } catch (e) {
    throw error(e, null, null, null);
  }
};

const getUserByDoc = async doc => {
    try {
      const { db } = Firebase.getConnection();
  
      console.log(`doc: ${doc}`);

      // Get Doc's
      const user = await db
        .collection("prueba-627ea")
        .doc(doc)
        .get();
    
      console.log('usuario retornado:');
    console.log(user.data());

      return user.data();//r.docs.map(doc => doc.data());
    } catch (e) {
        throw error(e, null, null, null);
    }
  };

const deleteUser = async (coll, doc) => {
  try {
    const { db } = Firebase.getConnection();

    await db
      .collection(coll)
      .doc(doc)
      .delete();
  } catch (e) {
    throw error(e, null, null, null);
  }
};

const updateUser = async (coll, doc, data) => {
  try {
    const { db } = Firebase.getConnection();

    await db
      .collection(coll)
      .doc(doc)
      .update(data);
  } catch (e) {
    throw error(e, null, null, null);
  }
};

const uploadImage = async (file, nameFile) => {
  try {
    console.log("uploadImage IN");

    const { storageFirebase } = Firebase.getConnection();

    const mimeType = file.originalname.split(".").pop();
    const bucketFile = storageFirebase.file(
      `images_user/${nameFile}.${mimeType}`
    );

     console.log("bucketFile.save() inicio ");

    await bucketFile.save(file.buffer, {
      metadata: { contentType: `image/${mimeType}` },
      public: true
    });

    console.log("bucketFile.save() fin ");

    return `https://storage.googleapis.com/${storageFirebase.name}/images_user/${nameFile}.${mimeType}`;
  } catch (e) {
    throw error(e, null, null, null);
  }
};

const deleteImage = async filename => {
  try {
    console.log("filename " + filename);

    const { storageFirebase } = Firebase.getConnection();

    await storageFirebase.storage
      .bucket(storageFirebase.name)
      .file(filename)
      .delete();
  } catch (e) {
    throw error(e, null, null, null);
  }
};


module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
module.exports.uploadImage = uploadImage;
module.exports.deleteImage = deleteImage;
module.exports.updateUser = updateUser;
module.exports.getUserByDoc = getUserByDoc;