const jwt = require("jsonwebtoken");

const auth = (res, req, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedToken;

    if (token) {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken?.id;
    } else {
      decodedToken = jwt.decode(token);

      req.userId = decodedToken?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
