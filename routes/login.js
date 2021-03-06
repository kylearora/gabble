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
    models.posts.findAll({
      include: [
        {
          model: models.likes,
          as : 'likes'
        },
        // {
        //   model: models.users,
        //   through: 'user'
        // }
      ],
      limit: 30,
      order: [['createdAt', 'DESC']]
     })
    .then(function(posts){
    console.log(posts[0].likes[0])
        models.users.findOne()
        .then(function(user){
          res.render("index", {
            testmessage : "Succesfully rendered posts",
            posts:posts,
            user: req.session.user
          })
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
