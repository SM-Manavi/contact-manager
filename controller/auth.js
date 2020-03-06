const User = require("../model/user");
const bcrypt = require("bcryptjs");

module.exports.getLogin = (req, res, next) => {
  res.render("./auth/login");
};

module.exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.redirect("/login");
      } else {
        bcrypt.compare(password, user.password).then(doMatch => {
          if (!doMatch) {
            res.redirect("/login");
          } else {
            req.session.isLoggedIn = true;
            req.session.userId = user._id.toString();
            res.redirect("/contacts");
          }
        });
      }
    })
    .catch(err => console.log(err));
};

module.exports.getSignup = (req, res, next) => {
  res.render("./auth/signup");
};

module.exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        res.redirect("/login");
      } else {
        return User.create({
          email: email,
          password: bcrypt.hashSync(password, 12)
        });
      }
    })
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.userId = user._id.toString();
      res.redirect("/contacts");
    })
    .catch(err => console.log(err));
};
