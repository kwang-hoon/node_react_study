const {User} = require('../models/User')

let auth = (req, res, next) => {

    //인증 처리

    //쿠키에서 토큰 get
    let token = req.cookies.x_auth;

    //token decode
    User.findByToken(token, (err, user) => {

        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})

        req.token = token;
        req.user = user;

        next();
    })


    //user 인증
}

module.exports = {auth};