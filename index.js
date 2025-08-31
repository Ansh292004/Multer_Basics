// LOAD ENVIRONMENT VARIABLES
require('dotenv').config();

// IMPORT REQUIRED PACKAGES
const express = require('express');
const multer = require('multer');
const path = require('path');

// DEFINE PORT
const PORT = process.env.PORT || 3000;

// CREATE EXPRESS APP INSTANCE
const app = express();

// SERVE STATIC FILES (UPLOADED FILES WILL BE ACCESSIBLE AT /UPLOADS/...)
app.use('/uploads', express.static('uploads'));

// PARSE URL-ENCODED FORM DATA
app.use(express.urlencoded({ extended: false }));

// SET VIEW ENGINE AS EJS AND DEFINE VIEWS DIRECTORY
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// MULTER STORAGE CONFIGURATION
const storage = multer.diskStorage({
  // DESTINATION FOLDER FOR FILES
  destination: (req, file, cb) => {
    cb(null, path.resolve('./uploads')); 
  },
  // CUSTOM FILE NAME FORMAT
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// FILE FILTER FUNCTION (CHECKS EXTENSION + MIME TYPE)
function fileFilter(req, file, cb) {
  // ALLOWED FILE TYPES
  const allowedTypes = /jpeg|jpg|png|gif/;

  // CHECK FILE EXTENSION
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  // CHECK MIME TYPE
  const mimetype = allowedTypes.test(file.mimetype);

  // DECISION BASED ON VALIDATION
  if (extname && mimetype) {
    cb(null, true); // ACCEPT FILE
  } else {
    cb(new Error('ONLY IMAGES ARE ALLOWED (JPG, PNG, GIF)!')); // REJECT FILE
  }
}

// MULTER INSTANCE WITH STORAGE + FILTER
const upload = multer({ storage, fileFilter });

// ROUTE TO RENDER UPLOAD FORM
app.get('/', (req, res) => {
  res.render('file'); 
});

// ROUTE TO HANDLE FILE UPLOAD
app.post('/upload', (req, res) => {
  // CALL MULTER MIDDLEWARE
  upload.single('myFile')(req, res, function (err) {
    if (err) {
      return res.status(400).send({ error: err.message });//use err.message instead of whole err object as it provides whole stack of errors and ca cause hinders in prod(in development for deep dive err is fine)
    }
    // REDIRECT TO FORM AFTER SUCCESSFUL UPLOAD
    res.redirect('/');
    console.log(req.file); // LOG UPLOADED FILE DETAILS
  });
});

// START EXPRESS SERVER
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT: ${PORT}`);

});
