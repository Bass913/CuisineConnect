const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];
  if (!token) return res.sendStatus(401);
  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (!user) {
    res.clearCookie(process.env.JWT_NAME);
    return res.sendStatus(401);
  }

  const { username, id } = user;

  const response = {
    username,
    id,
  };

  req.user = response;
  next();
};
