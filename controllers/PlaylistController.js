const db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.Playlist
            .find(req.query)
            .sort({ name: 1 })
            .then(dbPlaylist => res.json(dbPlaylist))
            .catch(err => res.status(422).json(err))
    },
    findbyID: function (req, res) {
        db.Playlist
            .findById(req.params.id)
            .then(dbPlaylist => res.json(dbPlaylist))
            .catch(err => res.status(422).json(err))
    },
    create: function (req, res) {
        console.log(req)
        db.Playlist
            .create(req.body)
            .then(({ _id }) => db.User.findByIdAndUpdate(req.params.id, { $push: { playlists: _id } }, { new: true }))
            .then(dbPlaylist => res.json(dbPlaylist))
            .catch(err => res.status(422).json(err))
    },
    update: function (req, res) {
        db.Playlist
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        console.log(req)
        db.Playlist
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};