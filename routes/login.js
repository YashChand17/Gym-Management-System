var express = require('express');
var router = express.Router();
const usercontroller=require("../controllers/usercontroller");
const AdminAuth=require("../middleware/AdminAuth");
const UserAuth=require("../middleware/UserAuth")
const TrainerAuth=require("../middleware/TrainerAuth")

var bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}));

router.get('/',AdminAuth.islogout,UserAuth.islogout,(req, res, next) => {
    res.render('login');
  });



router.get("/dashboard",AdminAuth.islogin,usercontroller.loadDashboard);
router.get("/userdashboard",UserAuth.islogin,usercontroller.loaduserDashboard);
router.get("/trainerdashboard",TrainerAuth.islogin,usercontroller.loadtrainerDashboard);

router.post('/',usercontroller.verifyLogin);

router.get("*",function(req,res,next){
  res.redirect('/login')
})

  

module.exports = router;