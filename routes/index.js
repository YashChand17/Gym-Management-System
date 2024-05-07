var express = require('express');
var router = express.Router();
const usercontroller=require("../controllers/usercontroller");
const AdminAuth=require("../middleware/AdminAuth");
const UserAuth=require("../middleware/UserAuth")

/* GET home page. */
router.get('/',AdminAuth.islogout,UserAuth.islogout, function(req, res, next) {
  res.render('index', { title: 'Express' });
}); 








module.exports = router;
