const jwt = require("jsonwebtoken");

const getAccessToRoute = (req, res, next) => {
  const access_token = req.headers.authorization.split(" ")[1];

  if (!access_token) {
    return res.status(401).json("You are not authenticated.");
  }

  jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, dec) => {
    if (err) {
      return res.status(403).json("You are not authorized");
    }

    req.user = {
      id: dec.id,
      name: dec.name,
    };
    next();
  });
};

module.exports = { getAccessToRoute };
