var express = require('express');
var router = express.Router();
const session =require("express-session");
const config=require("../config/config");

const usercontroller=require("../controllers/usercontroller")
const UserAuth=require("../middleware/UserAuth")
const axios=require('axios').default;
/* GET users listing. */
router.get('/', UserAuth.islogin,usercontroller.loaduserDashboard);

router.get('/Recipe', UserAuth.islogin,function(req, res, next) {
  res.render('Recipe.hbs');
});
router.get('/Shop', UserAuth.islogin,function(req, res, next) {
  res.render('Shop.hbs');
});
router.get('/logout',UserAuth.islogin,usercontroller.logout);




module.exports = router;
