const router = require("express").Router();
const {
  getUser,
  updateProfile,
  getVideoByUser,
  subscribeUser,
  unSubscribeUser,
} = require("../controllers/user.controller");
const { getAccessToRoute } = require("../middleware/auth/auth.js");
const multerUploadProfileImage = require("../middleware/multer/multerImageConfig");

router.get("/:id", getUser);
router.put(
  "/update/:id",
  [getAccessToRoute, multerUploadProfileImage.single("file")],
  updateProfile
);
router.get("/videos/:id", getVideoByUser);
router.put("/sub/:id", getAccessToRoute, subscribeUser);
router.put("/unSub/:id", getAccessToRoute, unSubscribeUser);

module.exports = router;
