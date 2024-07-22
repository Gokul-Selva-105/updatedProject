const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Employee = require("./Employee");

const app = express();
const uri = `mongodb+srv://gokulselva105:DefaultPassword@cluster0.mg5aj.mongodb.net/DataList?retryWrites=true&w=majority&appName=Cluster0`;

app.use(cors());
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/", async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    await newEmployee.save();
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
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
  } catch  (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));







// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const Employee = require("./Employee");

// const app = express();
// const uri = `mongodb+srv://gokulselva105:DefaultPassword@cluster0.mg5aj.mongodb.net/DataList?retryWrites=true&w=majority&appName=Cluster0`;

// app.use(cors());
// app.use(express.json());

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// app.get("/", async (req, res) => {
//   try {
//     const employees = await Employee.find({});
//     res.json(employees);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.post("/", async (req, res) => {
//   const newEmployee = new Employee(req.body);
//   try {
//     await newEmployee.save();
//     const employees = await Employee.find({});
//     res.json(employees);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.put("/:id", async (req, res) => {
//   try {
//     await Employee.findByIdAndUpdate(req.params.id, req.body);
//     const employees = await Employee.find({});
//     res.json(employees);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.delete("/:id", async (req, res) => {
//   try {
//     await Employee.findByIdAndDelete(req.params.id);
//     const employees = await Employee.find({});
//     res.json(employees);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.listen(3000, () => console.log("Server is running on port 3000"));

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const Employee = require("../server/Employee");
// const uri = `mongodb+srv://gokulselva105:DefaultPassword@cluster0.mg5aj.mongodb.net/DataList?retryWrites=true&w=majority&appName=Cluster0`;
// app.use(cors());
// app.use(express.json());

// mongoose.connect(uri);

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// app.get("/", async (req, res) => {
//   try {
//     const employees = await Employee.find({});
//     res.json(employees);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.delete("/:id", async (req, res) => {
//   const id = req.params.id
//   await Employee.findByIdAndDelete(id)
//   const employeesDel = await Employee.find({});
//   res.json(employeesDel)
// });

// app.listen(3000, () => console.log("Server is running on port 3000"));




// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const Employee = require("../server/Employee");
// const uri = `mongodb+srv://gokulselva105:DefaultPassword@cluster0.mg5aj.mongodb.net/DataList?retryWrites=true&w=majority&appName=Cluster0`;
// app.use(cors());
// app.use(express.json());

// mongoose.connect(uri);

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// app.get("/", async (req, res) => {
//   try {
//     const employees = await Employee.find({});
//     res.json(employees);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.delete("/:id", async (req, res) => {
//   const id = Number(req.params.id);
//     await Employee.findByIdAndDelete(id)
// });

// app.listen(3000, () => console.log("Server is running on port 3000"));
