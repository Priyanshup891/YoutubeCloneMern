const router = require("express").Router();
const {
  register,
  logout,
  login,
  checkAuth,
} = require("../controllers/auth.controller");

const {getAccessToRoute} = require("../middleware/auth/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/check",getAccessToRoute, checkAuth);
router.get("/logout", logout);

module.exports = router;
