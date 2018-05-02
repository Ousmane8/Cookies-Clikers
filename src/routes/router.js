var express = require('express');
var path = require('path');
var router = express.Router();
var User = require('../models/user');

// GET itinéraire pour la lecture des données
router.get('/', function (req, res, next) {
  return res.render('index');
});

//POST route pour la mise à jour des données
router.post('/', function (req, res, next) {
  // confirmez que l'utilisateur a tapé deux fois le même mot de passe
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Les mots de passe ne correspondent pas.');
    err.status = 400;
    res.send("les mots de passe ne correspondent pas");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Mauvais email ou mot de passe.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Tous les champs sont obligatoires.');
    err.status = 400;
    return next(err);
  }
})

// GET itinéraire après l'inscription
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Pas autorisé! Retourner!');
          err.status = 400;
          return next(err);
        } else {
          return res.render('donut', { username: user.username })
        }
      }
    });
});
// GET pour la conversation
router.get('/conversation', function (req, res, next) {
  return res.render('conversation');
});
// GET pour la déconnexion 
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // supprimer un objet de session
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;