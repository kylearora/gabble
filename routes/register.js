const express = require("express")
const router = express.Router()
const models = require("../models")
const bcrypt = require("bcryptjs")

router.get("/register", function (req, res){
  res.render("register")
})

router.post("/register", function (req, res){
  const newUser = models.users.build({
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName
  })
  newUser.save()
  .then(function(user){
    res.redirect("/login")
  })
  .catch(function(error){
    res.render("register", {
      errorMessage: "You did something wrong FOOL",
      error: error.errors
    })
  })
})






// router.post("/api/vendor/items", function(req,res) {
//   const newVending = models.vendingItems.build({
//     name: req.body.name,
//     cost: req.body.cost,
//     quantity: req.body.quantity,
//     desc: req.body.desc
//   })
//   newVending.save()
//   .then(function(newItem){
//     res.json({success: true})
//   })
// })
//
// router.post("/register", function(req,res) {
//   const name = req.body.name
//   const email= req.body.email
//   const username = req.body.username
//   const password = req.body.password
//   const user = new Users()
//   user.name = name
//   user.email = email
//   user.username = username
//   user.passwordHash = bcrypt.hashSync(password, 8)
//   user.save().then(function(user) {
//     // req.session.user = user
//     res.redirect("/")
//   })
//   .catch(function(error){
//     res.render("register", {
//       user:user,
//       errorMessage: "You need more info, DAWG",
//       error: error.errors
//     })
//   })
// })
//
//


module.exports = router
