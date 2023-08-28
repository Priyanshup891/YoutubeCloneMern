import React, { useEffect } from "react";
import { styled } from "styled-components";
import VideoCard from "../VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRandomVideo, reset } from "../../redux/video/videoSlice";
import Loader from "../Loader";

const Videos = () => {
  const { randomVideos, isLoading, isError, message } = useSelector(
    (state) => state.video
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getRandomVideo());

    return () => dispatch(reset());
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <VideosGrid>
        {randomVideos?.map((videos, index) => (
          <VideoCard videos={videos} index={index} />
        ))}
      </VideosGrid>
      <ToastContainer />
    </>
  );
};

const VideosGrid = styled.div`
  width: 100%;
  display: grid;
  margin-top: 8px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

export default Videos;
