const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies[process.env.JWT_NAME];
  if (!token) return res.sendStatus(401);
  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (!user) {
    res.clearCookie(process.env.JWT_NAME);
    return res.sendStatus(401);
  }

  const { username, id, favoriteRecipes } = user;

  const response = {
    username,
    id,
    favoriteRecipes,
  };

  req.user = response;
  next();
};
