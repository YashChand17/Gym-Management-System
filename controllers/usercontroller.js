const User = require("../models/user");
const Attendance = require("../models/attendance")
const MembershipPlan = require("../models/plan")
const moment = require("moment");
var session = require('express-session')

const verifyLogin = async (req, res) => {
  try {
    const UserID = req.body.UserID;
    const Password = req.body.Password;

    const Userdata = await User.findOne({ UserID: UserID });
    // req.session.user_id= Userdata?.UserID;
    // req.session.user_id=req.session.sessionuserid;
    if (Userdata?.Password == Password) {
      const sessionuserid = Userdata?._id;
      req.session.user_id = sessionuserid;
      req.session.is_admin = Userdata?.is_admin;
      req.session.is_trainer = Userdata?.is_trainer;

      if (Userdata?.is_admin == 1) {

        res.status(201).redirect("/dashboard");
      }
      else if (Userdata?.is_trainer == 1) {
        res.status(201).redirect("/trainerdashboard")
      }
      else if (Userdata?.is_admin == 0 && Userdata?.is_trainer == 0) {
        res.status(201).redirect("/userdashboard")
      }




    } else {
      res.render("login", { message: "invalid userID" })
    }

  } catch (error) {
    res.status(400).send(error.message)

  }
}

const loadDashboard = async (req, res) => {
  try {
    res.render('dashboard');
  } catch (error) {
    console.log(error.message);
  }
}
const loaduserDashboard = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id).populate('MembershipPlan');
    res.render('userdashboard', { user: userData });
  } catch (error) {
    console.log(error.message);
  }
}
const loadtrainerDashboard = async (req, res) => {
  try {
    res.render('trainerdashboard');
  } catch (error) {
    console.log(error.message);
  }
}



const logout = async (req, res) => {
  try {

    req.session.destroy();

    res.redirect('/login');
  } catch (error) {
    console.log(error.message)
  }

}


const getAnalysisData = async (req, res) => {
  try {
    const maleCount = await User.countDocuments({ Gender: 'Male', is_admin: 0, is_trainer: 0 });
    const femaleCount = await User.countDocuments({ Gender: 'Female', is_admin: 0, is_trainer: 0 });
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // set start of day to 00:00:00.000
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // set end of day to 23:59:59.999
    const attendanceCount = await Attendance.countDocuments({ date: { $gte: startOfDay, $lte: endOfDay } });
    const mostActiveTime = await Attendance.aggregate([
      { $match: { date: { $gte: startOfDay, $lte: endOfDay } } },
      { $group: { _id: { $hour: "$date" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const analysisData = {
      maleCount: maleCount,
      femaleCount: femaleCount,
      attendanceCount: attendanceCount,
      mostActiveTime: mostActiveTime.length > 0 ? `${mostActiveTime[0]._id}:00 - ${mostActiveTime[0]._id}:59` : 'N/A'

    };

    res.render('Analysis', { analysisData });
  } catch (err) {
    res.status(500).send({ message: "Error fetching analysis data" });
  }
};

const express = require('express');
const router = express.Router();

const getMonthlyCustomerData = async () => {
  try {
    // Get current year and previous year
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    // Get the monthly customer count for the current year
    const currentYearCustomerData = await User.aggregate([
      // Match users with membership plans
      {
        $match: {
          MembershipPlan: { $exists: true }
        }
      },
      // Unwind the membership plans array
      {
        $unwind: "$MembershipPlan"
      },
      // Match membership plans with membership start date in current year
      {
        $match: {
          "MembershipPlan.MembershipStartDate": {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999)
          }
        }
      },
      // Group by month and count the number of customers
      {
        $group: {
          _id: { $month: "$MembershipPlan.MembershipStartDate" },
          count: { $sum: 1 }
        }
      },
      // Sort the customer data by month
      {
        $sort: { _id: 1 }
      }
    ]);

    // Get the monthly customer count for the previous year
    const previousYearCustomerData = await User.aggregate([
      // Match users with membership plans
      {
        $match: {
          MembershipPlan: { $exists: true }
        }
      },
      // Unwind the membership plans array
      {
        $unwind: "$MembershipPlan"
      },
      // Match membership plans with membership start date in previous year
      {
        $match: {
          "MembershipPlan.MembershipStartDate": {
            $gte: new Date(previousYear, 0, 1),
            $lte: new Date(previousYear, 11, 31, 23, 59, 59, 999)
          }
        }
      },
      // Group by month and count the number of customers
      {
        $group: {
          _id: { $month: "$MembershipPlan.MembershipStartDate" },
          count: { $sum: 1 }
        }
      },
      // Sort the customer data by month
      {
        $sort: { _id: 1 }
      }
    ]);

    // Extract the monthly customer count for the current and previous year
    const currentYearCustomerCount = currentYearCustomerData.map(data => data.count);
    const previousYearCustomerCount = previousYearCustomerData.map(data => data.count);

    // Return an array of customer counts
    return [...currentYearCustomerCount, ...previousYearCustomerCount];
  } catch (error) {
    console.log(error);
    return [];
  }
};


// Route handler for the dashboard page
const dashboardPage = async (req, res) => {
  try {


    // Combine the sales data for the current and previous year
    const salesData = await getMonthlySalesData

    // Render the dashboard page with the sales data
    res.render("dashboard", { salesData });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getMonthlySalesData = async () => {
  try {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    const currentYearSalesData = await User.aggregate([
      {
        $match: {
          MembershipPlan: { $exists: true }
        }
      },
      {
        $unwind: "$MembershipPlan"
      },
      {
        $match: {
          "MembershipPlan.MembershipStartDate": {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31, 23, 59, 59, 999)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$MembershipPlan.MembershipStartDate" },
          sales: { $sum: "$MembershipPlan.Price" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const previousYearSalesData = await User.aggregate([
      {
        $match: {
          MembershipPlan: { $exists: true }
        }
      },
      {
        $unwind: "$MembershipPlan"
      },
      {
        $match: {
          "MembershipPlan.MembershipStartDate": {
            $gte: new Date(previousYear, 0, 1),
            $lte: new Date(previousYear, 11, 31, 23, 59, 59, 999)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$MembershipPlan.MembershipStartDate" },
          sales: { $sum: "$MembershipPlan.Price" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const monthlySalesData = Array.from({ length: 12 }, (_, i) => {
      const currentMonthSales = currentYearSalesData.find(data => data._id === i + 1);
      const previousMonthSales = previousYearSalesData.find(data => data._id === i + 1);
      const currentMonthSalesValue = currentMonthSales ? currentMonthSales.sales : 0;
      const previousMonthSalesValue = previousMonthSales ? previousMonthSales.sales : 0;
      return currentMonthSalesValue + previousMonthSalesValue;
    });

    const currentMonth = new Date().getMonth();
    for (let i = currentMonth + 1; i < 12; i++) {
      monthlySalesData[i] = 0;
    }

    const salesData = monthlySalesData.map(data => data.sales);

    return salesData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = {
  verifyLogin,
  loadDashboard,
  loaduserDashboard,
  loadtrainerDashboard,
  logout,
  getAnalysisData,
  getMonthlySalesData, dashboardPage,
  getMonthlyCustomerData


};