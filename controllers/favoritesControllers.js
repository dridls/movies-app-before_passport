const getFavorites = (req, res) => {
  res.send(req.user);
  User.findOne({ _id: req.user });
};

module.exports = { getFavorites };

// Add token to the header that has to work once logged in
