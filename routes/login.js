const express = require("express")
const router = express.Router()
const models = require("../models")
const bcrypt = require("bcryptjs")

const requireAuth = function(req, res, next) {
  // console.log(req.session.user);
  if (req.session.user) {
    next()
  } else {
    res.redirect("/login")
  }
}

router.get("/",  requireAuth, function(req, res) {
    // console.log("Connected");
    models.posts.findAll()
    .then(function(posts){
      // console.log(posts);
      res.render("index", {
        testmessage : "Succesfully rendered posts",
        posts:posts
      })
    })
  })


router.get("/login", function (req, res){
  res.render("login")
})

router.post("/login", function (req, res){
  const username = req.body.username
  const password = req.body.password
  let users = models.users

  users.find({
      where: {
            username: username
            }
  })
    .then(function(user){
      if(!user) {
        res.render("login", {
          message : "Your credentials are weak DAWG"
        })
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = user
          res.redirect("/")
      } else {
        res.render ("login", {
          message : "Your credentials are weak DAWG"
        })
      }
    }
  })
})


module.exports = router
