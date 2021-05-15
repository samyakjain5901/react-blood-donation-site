//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
// const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const emailExistence=require('email-existence');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy; //this is a strategy just like local strategy to verify / authenticate using passport
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const nodemailer = require('nodemailer');
const { text } = require('body-parser');
const smtpTransport = require('nodemailer-smtp-transport');
const cors=require('cors');
const cookieParser = require('cookie-parser');
const { request } = require('express');

app.use(express.static("public"));
// app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(function (req, res, next) {
  
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001, https://76cjg.csb.app');
  
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
  
//   // Pass to next layer of middleware
//   next();
// });

//this sets up our session
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 1800000}
}));
app.use(passport.initialize());
app.use(express.json());
app.use(passport.session());
app.use(cookieParser(process.env.SECRET));
app.use(
  cors({
    origin: "http://localhost:3001", // <-- location of the react app were connecting to
    credentials: true,
  })
);
// app.use(cors());
// app.use(cors({
//   origin: '*',
//   credentials: true }));

mongoose.connect("mongodb+srv://yush:"+process.env.PASSWORD+"@cluster0.dgbfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  secret: [String],
  googleId: String,
  facebookId: String, 
  picurL:String,
});
const donorSchema = new mongoose.Schema({
  userDetails:userSchema,
  name:String,
  bloodGroup:String,
  mobileNumber:Number,
  alternateMobileNumber:Number,
  state:String,
  city:String,
  availability:Boolean,
  covidPlasma:Boolean,
  showMobileNumber:Boolean, 
});
const bloodRequestSchema=new mongoose.Schema({
  userDetails:userSchema,
  code:Number,
  name:String,
  age:Number,
  bloodGroup:String,
  mobileNumber:Number,
  alternateMobileNumber:Number,
  state:String,
  city:String,
  requirementDate:Date,
  unitsNeeded:Number,
  hospitalName:String,
  patientAdress:String,
  purpose:String,
  covidPlasma:Boolean,
  //setting expiry time to 2 days ie 172800 seconds or 4 days
  createdAt: { type: Date, expires:345600, default: Date.now },
})
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(findOrCreate);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // secure:true for port 465, secure:false for port 587
  auth: {
    user: 'bloodforyou5@gmail.com',
    pass: 'aprsy@12345'
  }
});

const User = new mongoose.model("User", userSchema);
const Donor=new mongoose.model("Donor",donorSchema);
const BloodRequest=new mongoose.model("BloodRequest",bloodRequestSchema);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// User.plugin(passportLocalMongoose);

var bldGrpChartForDonor = {
  "A+": ["A+", "AB+"],
  "A-": ["A+", "AB+", "AB-", "A-"],
  "AB+": ["AB+"],
  "AB-": ["AB+", "AB-"],
  "B+": ["B+", "AB+"],
  "B-": ["B+", "AB+", "B-", "AB-"],
  "O+": ["B+", "AB+", "A+", "O+"],
  "O-": ["B+", "AB+", "B-", "AB-", "A+", "O+", "O-", "A-"],
};

var bldGrpChartForRec = {
  "A+": ["A+", "A-", "O+", "O-"],
  "A-": ["O-", "A-"],
  "AB+": ["B+", "AB+", "B-", "AB-", "A+", "O+", "O-", "A-"],
  "AB-": ["B-", "AB-", "O-", "A-"],
  "B+": ["B+", "O+", "B-", "O-"],
  "B-": ["B-", "O-"],
  "O+": ["O+", "O-"],
  "O-": ["O-"],
};


passport.use(User.createStrategy());
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      email:profile.emails[0].value,
    },{
      googleId: profile.id,
      picurL:profile.photos[0].value,
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/secrets",
    profileFields: ['id', 'emails', 'name','picture']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      email:profile.emails[0].value,
    },{
      facebookId: profile.id,
      picurL:profile.photos[0].value,
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

app.get("/check", function(req, res) {
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()){
    res.send("Yes");
  }else{
    res.send("No");
  }
});

app.post("/verify/email",function(req,res){
  console.log("got the req atleast");
  const email=req.body.email;
  // console.log(req.body);
  // console.log(req.body);
  // send mail with an otp baby
  // sendback to the server the same otp
  const otp=Math.floor(Math.floor(1000 + Math.random() * 9000));
  var txt='Your otp for this email verification is '+otp;
  var mailOptions = {
    from: 'bloodforyou5@gmail.com',
    to: email,
    subject: 'Your confirmation otp',
    text: txt,
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("noo thats fuckign wrong");
      res.send("email could not be sent plz check your email id")
    } else {
      console.log('Email sent!! ');
    }
  }); 
  res.send(otp+" ");  
});
app.get("/logout", function(req, res) {
  req.logout();
  res.send("success");
});
app.get('/auth/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
]
}));

app.get('/auth/google/secrets', passport.authenticate('google', {
  // successRedirect:"https://d61eq.csb.app/",
    failureRedirect: '/login'
  }),
  function(req, res) {
    console.log(req.user);
    res.redirect("http://localhost:3000/home")
  });

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    console.log(req.user);
    res.redirect("http://localhost:3000/home")
  });

app.post("/bloodrequest/getbycode",function(req,res){
  //send as{code:"code"}
  const reqCode=req.body.code;
  BloodRequest.findOne({code:reqCode},function(err,FoundDocument){
    if(FoundDocument){
      res.send({
        message:"successfully found the document with this code",
        request:FoundDocument
      })
    }else{
      res.send({
        message:"could not find any document with the specified code"
      })
    }
  })
});

// app.post("/bloodrequest/replaceold",function(req,res){
//   const data=req.body;
//   BloodRequest.findOneAndDelete({userDetails:req.user},function(err,deletedDocument){
//     const newReq=new BloodRequest({
//       code:Math.floor(100000 + Math.random() * 900000),
//       userDetails:req.user,
//       ...data,
//     });
//     newReq.save();
//     res.send({message:"successfully saved the document",newRequest:newReq,oldRequest:deletedDocument});
//   });
// });

app.get("/donors/mystatus",function(req,res){
  if(req.user)
  Donor.findOne({'userDetails._id':req.user._id},function(err,FoundDocument){
    if(FoundDocument){
      //ask for delete and save
      res.send({
        message:"donor actually exists",
        donorDetails:FoundDocument,
      })
    }else{
      //successfully save the document to the device
      res.send({
        message:"No donor exists for this user",
        donorDetails:FoundDocument,
      })
    }
  })
  else res.send({message:"You are not even logged in bro"})
});

app.post("/donors/find",function(req,res){
  const reqData=req.body;
  //add the checks here and return the eligible donors as and how it suits
  let query={
    bloodGroup:{ $in: bldGrpChartForRec[reqData.bloodGroup] },
    city:reqData.city,
    state:reqData.state,
  };
  if(reqData.covidPlasma==true)
  query={
    ...query,
    covidPlasma:true,
  }
  if(req.user){
    query={
      ...query,
      'userDetails._id':{$ne:req.user._id},
    }
  }
  console.log(query);
  Donor.find(query,function(err,EligibleDonors){
    console.log(EligibleDonors);
    if(EligibleDonors.length>0){
      res.send({
        message:"donors for this request are found ",
        List:EligibleDonors
      });
      
    }
    else{ 
      res.send({
        message:"no donors for the above requests are found",
        List:EligibleDonors,
      })
    }
  })
})

app.post("/donors/modifydetails",function(req,res){
  const data=req.body;
  Donor.findOneAndDelete({'userDetails._id':req.user._id},function(err,DeletedDocument){
    if(DeletedDocument){
      //ask for delete and save
      const newDonor=new Donor({
        userDetails:req.user,
        ...data
      });
      newDonor.save(); 
      res.send({
        message:"the details have been modified successfully",
        donorDetails:newDonor,
      })
    }else{
      //successfully save the document to the device
      res.send({
        message:"no such donor exists to be able to deleted",
        donorDetails:null,
      })
    }
  })
});

app.post("/donors/become",function(req,res){
  const data=req.body; 
  console.log(data);
  Donor.findOne({'userDetails._id':req.user._id},function(err,FoundDocument){
    if(FoundDocument){
      //ask for delete and save
      res.send({
        message:"this user is already registered as a donor",
        donorDetails:FoundDocument,
      })
    }else{
      //successfully save the document to the device
      const newDonor=new Donor({
        userDetails:req.user,
        ...data
      });
      newDonor.save(); 
      res.send({
        message:"the donor has been saved to the database properly",
        donorDetails:newDonor
    })
    }
  })
});

app.post("/bloodrequest/deletebycode",function(req,res){
  const reqCode=req.body.code;
  BloodRequest.findOneAndDelete({code:reqCode},function(err,DeletedDocument){
    if(DeletedDocument){
      res.send({
        message:"the document has been deleted successfully",
        request:DeletedDocument
      });
    }else{
      res.send({
        message:"the document with this code doesn't exist",
        request:DeletedDocument
      });
    }
  })
});

app.get("/bloodrequest/showexistingrequests",function(req,res){
  if(req.user){
    BloodRequest.find({'userDetails._id':req.user._id},function(err,FoundDocuments){
      if(FoundDocuments){
        res.send({
          message:"requests have been found for this user",
          List:FoundDocuments,
        });
      }
      else{
        res.send({
          message:"requests have been found for this user",
          List:FoundDocuments,
        });
      }
    })
  }
  else{
    res.send("F");
  }
})

app.post("/bloodrequest/new",function(req,res){
  const data=req.body;
  BloodRequest.find({'userDetails._id':req.user._id},function(err,FoundDocuments){
    if(FoundDocuments.length>=3){
      //ask for delete and save 
      res.send({message:"there already exists 3 requests",request:FoundDocuments});
    }else{
      //successfully save the document to the device
      const newReq=new BloodRequest({
        code:Math.floor(100000 + Math.random() * 900000),
        userDetails:req.user,
        ...data,
      });
      newReq.save();
      res.send({
        message:"successfully saved the document",
        request:[...FoundDocuments,newReq],
        newReqCode:newReq.code,
      });
    }
  })
})

app.post("/bloodrequest/sendemail",function(req,res){
  const reqCode=req.body.code; 
  BloodRequest.findOne({code:reqCode},function(err,Request){
    if(Request){
      Donor.find({
        bloodGroup:{ $in: bldGrpChartForRec[Request.bloodGroup] },
        state:Request.state,
        city:Request.city,
        'userDetails._id':{$ne:req.user._id},
      },function(err,Donors){
        // console.log(Donors,Request);
        // res.send("yo");
        const txt="It is hereby informed that "+ 
        Request.name+" is in need of blood of "+ Request.bloodGrp+ " for " +Request.purpose
        + " at " +Request.hospitalName+". Plz contact "+Request.mobileNumber+" or "+
        Request.userDetails.email+ " if you are available and wish to help which will be highly appreciated.";
        Donors.forEach(element => {
          const mailId=element.userDetails.email;
          var mailOptions = {
            from: 'bloodforyou5@gmail.com',
            to: mailId,
            subject: 'Req for Blood by a Patient in need',
            text: txt,
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log("noo thats fuckign wrong");
            } else {
              console.log('Email sent!! ');
            }
        });
      });
      res.send({
        message:"An email has been sent to all the donors near you for your case and we hope you find a person and get well soon!!",
        donors:Donors,
      });
    })
  }else{
      res.send({
        message:"No request with this code was found",
      });
    }
  })
})

app.get("/bloodrequest/getlatestrequests",function(req,res){
  BloodRequest.find({})
     .sort('-createdAt')
     .exec(function(err, Requests) {
      if(Requests){
        Requests=Requests.slice(0,100);
        res.send({
          message:"found some documents !!",
          List:Requests
        })
      }else{
        res.send({
          message:"no documents to show !!",
          List:Requests
        })
      }
 });
})


app.post("/register", function(req, res) {
  console.log("came here")
  console.log(req?.body)
  User.findOne({email:req?.body?.email},function(err,user){
    console.log(user)
    if(user){
      console.log(user);
      res.send("A user with this id already exists Login Instead");
    }else{
      User.register({
        email: req?.body?.email
      }, req?.body?.password, function(err, user) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          passport.authenticate("local")(req, res, function() {
            console.log(req.user);
            console.log(req.isAuthenticated())
            res.send("registered now");
          });
        }
      });
    }
  })
  
});

app.get("/getname",function(req,res){
  console.log(req.user);
  res.send(req.user.email);
})
app.get("/picurl",function(req,res){
  if(req.user.picurL && req.user.picurL!==""){
    res.send(req.user.picurL);
  }else{
    res.send("No");
  }
})
app.post("/login", (req, res, next) => {
  console.log("got the req atleast");
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});





app.listen(5000, function() {
  console.log("Server started on port 5000.");
});
