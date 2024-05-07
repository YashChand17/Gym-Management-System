const User = require("../models/user");
var session = require("express-session");
const MembershipPlanModel = require("../models/plan");
const MembershipPlan = require("../models/plan");

// Create and Save Member
const CreateMember = async (req, res) => {
  //  validate request
  if (!req.body) {
    res.status(400).send({ message: "content cant be empty" });
    return;
  }
  const MembershipPlanName = req.body.MembershipPlan;
  const planExists = await MembershipPlanModel.exists({
    MembershipName: MembershipPlanName,
  });
  if (planExists) {
    const Membership = await MembershipPlanModel.findOne({
      MembershipName: MembershipPlanName,
    });

    //  new user
    const Member = new User({
      UserID: req.body.UserID,
      Name: req.body.Name,
      Password: req.body.Password,
      is_admin: 0,
      is_trainer: 0,
      Height: req.body.Height,
      Weight: req.body.Weight,
      BirthDate: req.body.BirthDate,
      MembershipPlan: Membership?._id,
      MembershipStartDate: req.body.MembershipStartDate,
      Phone: req.body.Phone,
      AlternatePhone: req.body.AlternatePhone,
      Address: req.body.Address,
      email: req.body.email,
      Gender: req.body.Gender,
      Status: req.body.Status,
    });

    // @ts-ignore
    Member.save({
      UserID: req.body.UserID,
      Name: req.body.Name,
      Password: req.body.Password,
      is_admin: 0,
      is_trainer: 0,
      Height: req.body.Height,
      Weight: req.body.Weight,
      BirthDate: req.body.BirthDate,
      MembershipPlan: Membership?._id,
      MembershipStartDate: req.body.MembershipStartDate,
      Phone: req.body.Phone,
      AlternatePhone: req.body.AlternatePhone,
      Address: req.body.Address,
      email: req.body.email,
      Gender: req.body.Gender,
    })

      .then((data) => {
        res.redirect("/dashboard/Members/add_member");
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occured while creating a create Operation",
        });
      });
  }
};

// Retrieve and return all Members/retrieve and return a single user
const FindMember = async (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    User.findById(id)
      .populate("MembershipPlan")
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
    User.find({ is_admin: 0, is_trainer: 0 })
      .populate("MembershipPlan")
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

const UpdateMember = async (req, res) => {
  try {
    const id = req.params.id;
    const membershipName = req.body.MembershipPlan;
    const planExists = await MembershipPlanModel.exists({
      MembershipName: membershipName,
    });

    if (planExists) {
      // Find the membership with the given name
      const membership = await MembershipPlan.findOne({ name: membershipName });

      if (!membership) {
        return res
          .status(404)
          .send({
            message: `Cannot find membership with name ${membershipName}`,
          });
      }

      // Update the user's MembershipPlan field with the membership ID
      req.body.MembershipPlan = membership._id;
    }

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });

    if (!user) {
      return res
        .status(404)
        .send({
          message: `Cannot update user with id ${id}. Maybe user not found!`,
        });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Error updating user information" });
  }
};

// Delete member with specified userid
const DeleteMember = async (req, res) => {
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
  CreateMember,
  FindMember,
  UpdateMember,
  DeleteMember,
};
