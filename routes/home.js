const express = require("express")
const router = express.Router()
const models = require("../models")

router.get("/logout", function (req, res){
  req.session.user = null;
  res.redirect("/login")
})

router.get("/delete/:id", function(req, res){
  models.likes.destroy({
    where: {
      postId : req.params.id
    }
  })
  .then(function(){
    models.posts.destroy({
      where: {
        id : req.params.id
      }
    })
  })
    .then(function(){
      res.redirect("/")
  })
})

router.get("/like/:id", function(req, res){
  const newLike = models.likes.build({
    userId : req.session.user.id,
    postId : req.params.id
  })
  newLike.save()
  .then(function(like){
    res.redirect("/")
  })
  .catch(function(error){
    console.log(error);
    res.render("index", {
      errorMessage: "We did not like your like",
      error:error.errors
    })
  })
})


module.exports = router
