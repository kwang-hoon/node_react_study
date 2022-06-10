const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

const {auth} = require('./middleware/auth')
const config = require('./config/key');
const {User} = require("./models/User");

const app = express()
const port = 5000

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI).then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', (req,res) => {

  const user = new User(req.body);
  
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})

    return res.status(200).json({
      success: true
    })
  }) 
})

app.post('/api/users//login', (req, res) => {

  //존재하는 이메일인지 확인
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "존재하지 않는 이메일입니다."
      })
    }

    //비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatched) => {
      if(!isMatched) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.."
        })
      }
      
      //맞다면 token 생성
      user.generateToken((err, user) => {
         if(err) return res.status(400).send(err);

         // 토큰 저장
         res.cookie("x_auth", user.token)
         .status(200)
         .json({
           loginSuccess: true,
           userId: user._id
         })
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    eamil: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  
  User.findOneAndUpdate(
    {_id: req.user._id}, {token: ""}
    , (err, user) => {
      if(err) return res.json({success: false, err});
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})