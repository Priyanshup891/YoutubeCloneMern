import axios from "axios";

const HTTP_URL = "http://localhost:8800/api/video";

const getRandomVideo = async () => {
  try {
    const response = await axios.get(`${HTTP_URL}/random`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getSomeVideo = async () => {
  try {
    const response = await axios.get(`${HTTP_URL}/some`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getVideoById = async (id) => {
  try {
    const response = await axios.get(`${HTTP_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const videoService = { getRandomVideo, getSomeVideo, getVideoById };
export default videoService;
