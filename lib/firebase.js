const admin = require('firebase-admin');
const accountKey = require('./ServiceAccountKey');

class Firebase {

    static getConnection() {

      try{
        if(this._db){
          return { db: this._db , storageFirebase: this._storageFirebase , auth: this._auth};
        }
      
        return this.createConnection();

      }catch(e){
        console.log('error en getConnection '+ e);
      }

    }

    static createConnection() {

      try {

        const config = {
          credential: admin.credential.cert(accountKey),
          apiKey: "AIzaSyBGDtuBrHvUUscYaxgPUwb5N3LBpAAnU9Y",
          authDomain: "prueba-627ea.firebaseapp.com",
          databaseURL: "https://prueba-627ea.firebaseio.com",
          projectId: "prueba-627ea",
          storageBucket: "prueba-627ea.appspot.com",
          messagingSenderId: "817026969975",
          appId: "1:817026969975:web:876e142ac47feb8e"
        };
        
        admin.initializeApp(config);
      
        // Get a reference to the database service
        this._db = admin.firestore();

        this._storageFirebase = admin.storage().bucket();

        // auth object
        this._auth = admin.auth();

        return { db: this._db , storageFirebase: this._storageFirebase , auth: this._auth};
        
      }catch(e){
          console.log('error en createConnection '+ e);
      }
    }
}

module.exports.Firebase = Firebase;