# Node.js-file-uploads-with-Express-and-Multer



This is a simple *Node.js + Express* project that demonstrates how to upload files using *MULTER*.
The project supports image uploads (.jpg, .jpeg, .png, .gif) with proper file filtering and custom storage configuration.

---

##  Features
- Upload single files from a form.
- Restrict uploads to *only image types* (JPEG, JPG, PNG, GIF).
- Custom file naming with timestamps.
- Serve uploaded files statically via /uploads.
- Basic EJS template for the upload form.

---

## Tech Stack
- *Node.js*
- *Express.js*
- *Multer* (for handling file uploads)
- *EJS* (for rendering the upload form)

---
## Project Structure
├── uploads/        # Uploaded files
├── views/          # EJS templates
│   └── file.ejs    # Upload form
├── index.js        # Main application file
├── package.json    # Project metadata & dependencies
└── README.md       # Documentation
