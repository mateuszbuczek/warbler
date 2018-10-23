const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    // finding a user
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    // checking if their password matches what was sent to the server
    let isMatch = await user.comparePassword(req.body.password);
    // if it all matches
    if (isMatch) {
      // log in
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password"
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid Email/Password"
    });
  }
};

exports.signup = async function(req, res, next) {
  try {
    //create a user
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    //create a token (signin  a token)
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    //see what kind of error
    // if validation fails
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
