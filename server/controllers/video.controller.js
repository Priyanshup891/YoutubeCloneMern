const Video = require("../models/video.model.js");
const asyncHandler = require("express-async-handler");

const uploadVideo = asyncHandler(async (req, res) => {
  try {
    const newVideo = await Video.create({
      userId: req.user.id,
      title: req.body.title,
      desc: req.body.desc,
      thumbnail_url: `http://localhost:8800/images/${req.savedImage}`,
      video_url: `http://localhost:8800/videos/${req.savedVideo}`,
    });

    await newVideo.save();
    res.status(200).json("Video has been uploaded successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

const getRandomVideo = asyncHandler(async (req, res) => {
  try {
    const videos = await Video.find().populate("userId");
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("userId");
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json(error);
  }
});

const increaseView = asyncHandler(async (req, res) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("Increment in view!");
  } catch (error) {
    res.status(500).json(error);
  }
});

const likeVideo = asyncHandler(async (req, res) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $addToSet: { likes: req.user.id },
      $pull: { dislikes: req.user.id },
    });
    res.status(200).json("user like the video.");
  } catch (error) {
    res.status(500).json(error);
  }
});

const dislikeVideo = asyncHandler(async (req, res) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $addToSet: { dislikes: req.user.id },
      $pull: { likes: req.user.id },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  uploadVideo,
  getRandomVideo,
  getVideoById,
  increaseView,
  likeVideo,
  dislikeVideo,
};
