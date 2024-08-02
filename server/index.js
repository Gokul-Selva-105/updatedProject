const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Employee = require("./Employee");

const app = express();
const uri = `mongodb+srv://gokulselva105:DefaultPassword@cluster0.mg5aj.mongodb.net/DataList?retryWrites=true&w=majority&appName=Cluster0`;

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

// Ensure the public directory exists
const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the following filetypes - " + filetypes
    );
  },
});

app.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/", upload.single("image"), async (req, res) => {
  const newEmployee = new Employee({
    ...req.body,
    id: new mongoose.Types.ObjectId().toString(),
    image: req.file ? `/public/${req.file.filename}` : "",
  });
  try {
    await newEmployee.save();
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = {
    ...req.body,
    image: req.file ? `/public/${req.file.filename}` : req.body.image,
  };

  try {
    await Employee.findByIdAndUpdate(req.params.id, updateData);
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
