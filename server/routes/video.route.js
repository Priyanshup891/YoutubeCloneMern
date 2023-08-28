const router = require("express").Router();
const {
  uploadVideo,
  getRandomVideo,
  getVideoById,
  increaseView,
  likeVideo,
  dislikeVideo,
  editVideo,
  deleteVideo,
  getSomeVideos,
} = require("../controllers/video.controller");
const { getAccessToRoute } = require("../middleware/auth/auth");
const uploadFile = require("../middleware/multer/multerVideoConfig.js");

router.post(
  "/",
  [
    getAccessToRoute,
    uploadFile.fields([
      { name: "image", maxCount: 1 },
      { name: "file", maxCount: 1 },
    ]),
  ],
  uploadVideo
);
router.put(
  "/edit/:id",
  [
    getAccessToRoute,
    uploadFile.fields([
      { name: "image", maxCount: 1 },
      { name: "file", maxCount: 1 },
    ]),
  ],
  editVideo
);
router.delete("/delete/:id", getAccessToRoute, deleteVideo);
router.get("/random", getRandomVideo);
router.get("/some", getSomeVideos);
router.get("/:id", getVideoById);
router.put("/view/:id", increaseView);
router.put("/like/:id", getAccessToRoute, likeVideo);
router.put("/dislike/:id", getAccessToRoute, dislikeVideo);

module.exports = router;
