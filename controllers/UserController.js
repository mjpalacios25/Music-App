const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.User
        .find(req.query)
        .sort({name: 1})
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err))
    },
    findbyID: function(req, res){
        db.User
        .findById(req.params.id)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err))
    },
    create: function(req, res){
        db.User
        .create(req.body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err))
    },
    remove: function(req, res) {
        db.User
        .findbyID({ _id: req.params.id })
        .then(dbUser => dbUser.remove())
        .catch(err => res.status(422).json(err))
    }
};