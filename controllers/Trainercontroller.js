const User = require("../models/user");
var session = require("express-session");

//new Trainer
const CreateTrainer = async (req, res) => {
  //  validate request
  if (!req.body) {
    res.status(400).send({ message: "content cant be empty" });
    return;
  }
  var MyClient = req.body.Client.split(",");
  //  new user
  const Trainer = new User({
    UserID: req.body.UserID,
    Name: req.body.Name,
    Password: req.body.Password,
    is_admin: 0,
    is_trainer: 1,
    Client: MyClient,
    email: req.body.email,
    Gender: req.body.Gender,
    Status: req.body.Status,
  });
  // @ts-ignore
  Trainer.save(Trainer)
    .then((data) => {
      res.redirect("/dashboard/Trainers/add_Trainer");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating a create Operation",
      });
    });
};
// Retrieve and return all Members/retrieve and return a single user
const FindTrainer = async (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    User.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id" + id });
      });
  } else {
    User.find({ is_admin: 0, is_trainer: 1 })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || " error occured while retrieving user information",
        });
      });
  }
};
const UpdateTrainer = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

// Delete member with specified userid
const DeleteTrainer = async (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

module.exports = {
  CreateTrainer,
  FindTrainer,
  UpdateTrainer,
  DeleteTrainer,
};
