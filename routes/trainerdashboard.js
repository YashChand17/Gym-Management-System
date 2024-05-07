var express = require('express');
var router = express.Router();
const session =require("express-session");
const config=require("../config/config");

const usercontroller=require("../controllers/usercontroller")
const TrainerAuth=require("../middleware/TrainerAuth")
/* GET users listing. */
router.get('/', TrainerAuth.islogin,function(req, res, next) {
  res.render('trainerdashboard');
});
router.get('/analytics', TrainerAuth.islogin,function(req, res, next) {
  res.render('traineranalytics.hbs');
});
router.get('/logout',TrainerAuth.islogin,usercontroller.logout);



module.exports = router;

