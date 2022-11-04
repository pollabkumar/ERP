const Users = require("../models/users") 
var bcrypt = require('bcryptjs');  
const Otp = require("../models/otp") 

const userList = async (req,resp)=>{   
    let data = req.user
    resp.json(data);
}

const userAdd = async  (req,res)=>{ 
    let profile = (req.file) ? req.file.filename:null;
    let {name,email,phone,password}  = req.body;
    let data = new Users({name,email,phone,profile,password});
    let response = await data.save();
    let myToken = await data.getAuthToken();
    res.status(200).json({message:'User Added Successfully',token:myToken});
}

const userLogin = async (req,res)=>{
    if(!req.body.email || !req.body.password){
        res.status(301).json({message:'Error',message:'Please select email/password'});
    }
    let user = await Users.findOne({email:req.body.email}); 
    var responseType = {
        message:'ok',
        statusText:'Error'
    }  
    if(user){ 
        var match = await bcrypt.compare(req.body.password,user.password) 
        if(match){
            let myToken = await user.getAuthToken();
            responseType.message = 'Login Successfully';
            responseType.token = myToken;
            responseType.statusText = 'Success' 
        }else{
            responseType.message = 'Invalid Password'; 
        }
    }else{ 
        responseType.message = 'Invalid Email ID'; 
    } 
    res.status(200).json(responseType);
}


const emailSend = async (req,res)=>{  
    let data = await Users.findOne({email:req.body.email}); 
    const responseType = {};
    if(data){
        let otpcode = Math.floor((Math.random()*10000)+1);
        let otpData = new Otp({
            email:req.body.email,
            code:otpcode,
            expireIn: new Date().getTime() + 300*1000
        })
        let otpResponse  = await otpData.save();
        responseType.statusText = 'Success'  
        responseType.message = 'Please check Your Email Id'; 
    }else{
        responseType.statusText = 'error' 
        responseType.message = 'Email Id not Exist'; 
    }
    res.status(200).json(responseType);
}

const changePassword = async(req,res)=>{ 
    let data =  await Otp.findOne({email:req.body.email,code:req.body.otpCode}); 

    const response = {}; 
    if(data){ 
        let currentTime = new Date().getTime();
        let diff = (data.expireIn - currentTime)/1000; 
        if(diff < 0){
            response.message = 'Token Expire';
            response.statusText = 'error';
        }else{ 
            let user = await Users.findOne({email:req.body.email});  
            user.password = req.body.password;
            user.save();
            response.message = 'Password changed Successfully';
            response.statusText = 'Success';
        } 
        
    }else{
        response.message = 'Invalid OTP'
        response.statusText = 'error';
    }
    res.status(200).json(response);
}

const mailer = (email,otp)=>{
    /*   https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer
  
  https://myaccount.google.com/lesssecureapps */
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,  
      auth: {
        user: 'code@gmail.com',
        pass: '9898998'
      }
    });
    
    var mailOptions = {
      from: 'code@gmail.com',
      to: 'ram@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'Thank you sir !'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  
 
module.exports = {
    userList,
    userAdd,
    userLogin, 
    emailSend,
    changePassword 
}