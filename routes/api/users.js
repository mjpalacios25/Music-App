const router = require("express").Router();
const usersController = require("../../controllers/UserController");
const playlistController = require("../../controllers/PlaylistController");

router.route("/")
    .get(usersController.findAll)
    


router.route("/:id")
    .get(usersController.findbyID)
    .delete(usersController.remove)
    .put(usersController.update)
    .post(playlistController.create)
    
router.route("/playlists/:id")
    .get(playlistController.findbyID)
    .put(playlistController.update)
    

module.exports = router;