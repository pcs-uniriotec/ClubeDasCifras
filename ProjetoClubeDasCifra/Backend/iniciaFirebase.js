let path                 = require('path');
const admin              = require('firebase-admin')
const serviceAccount     = require(path.join(__dirname, "../projetoclubedascifras-firebase-adminsdk-lvner-5d61655a42.json"))

var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://projetoclubedascifras.firebaseio.com'
})

const database = firebaseAdmin.database()

module.exports = {firebase: firebaseAdmin}