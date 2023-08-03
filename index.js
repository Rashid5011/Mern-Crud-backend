const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/Users");

const app = express();
app.use(
  cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://risshi2323:%40Rash0025@cluster0.cuqujry.mongodb.net/crudmern"
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log("error:", err));

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((deletedUser) => {
      // Change variable name from res to deletedUser
      res.json(deletedUser);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/createuser", (req, res) => {
  UserModel.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
    { new: true }
  )
    .then((updatedUser) => {
      // Change variable name from res to updatedUser
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3001, () => {
  console.log("app is running");
});
