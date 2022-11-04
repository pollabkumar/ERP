const express =  require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController')

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
var jwt = require('jsonwebtoken');

var passport  = require('passport');
require('../config/passport')(passport)

var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) { 
      cb(null,  Date.now()+'_'+file.originalname)
    }
  })
  var upload = multer({ storage: storage }) ; 

/* var jwtAuth = (req,resp,next)=>{
    var token = req.headers.authorization;
    token = token.split(' ')[1];
    jwt.verify(token,process.env.SECRETKEY,function(err,decoded){
        if(err){
            resp.send({message:'Invalid Token'})
        }else{
            next();
        }
    })
} */


router.get('/',(req,res)=>{
    res.send("Hello code improve....")
})

router.get('/list',passport.authenticate('jwt',{session:false}),userCtrl.userList)

router.post('/add',upload.single('myFile'),userCtrl.userAdd)

router.post('/email-send',userCtrl.emailSend)

router.post('/login',userCtrl.userLogin)
 
router.post('/change-password',userCtrl.changePassword)

module.exports = router;