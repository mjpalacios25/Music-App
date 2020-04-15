module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.isAuthenticated()) {
       
        next()
    }
    else{
    res.redirect("/login");
    }
  };
  