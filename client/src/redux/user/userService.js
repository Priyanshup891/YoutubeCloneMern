import axios from "axios";

const HTTP_URL = "http://localhost:8800/api/user";

const getUser = async (id) => {
  try {
    const response = await axios.get(`${HTTP_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getVideoByUser = async (id) => {
  try {
    const response = await axios.get(`${HTTP_URL}/videos/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const userService = { getUser, getVideoByUser };
export default userService;
