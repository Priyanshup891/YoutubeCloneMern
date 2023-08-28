import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSomeVideo,
  getVideoById,
  reset,
} from "../../redux/video/videoSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import axios from "axios";
import { format } from "timeago.js";
import Loader from "../../Components/Loader";

const CurrentVideoPage = () => {
  const { id } = useParams();
  const { currentVideo, someVideos, isLoading, isError, message } = useSelector(
    (state) => state.video
  );

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getVideoById(id));
    dispatch(getSomeVideo());

    return () => dispatch(reset());
  }, [dispatch, id, isError, message]);

  const handleSubscribe = async () => {
    if (!user && user === null) {
      navigate("/sign_in");
    } else {
      try {
        const response = await axios.put(
          `http://localhost:8800/api/user/sub/${currentVideo?.userId?._id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        if (response.status === 200 && response.statusText) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUnsubscribe = async () => {
    if (!user && user === null) {
      navigate("/sign_in");
    } else {
      try {
        const response = await axios.put(
          `http://localhost:8800/api/user/unSub/${currentVideo?.userId?._id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        if (response.status === 200 && response.statusText) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLike = async () => {
    if (!user && user === null) {
      navigate("/sign_in");
    } else {
      try {
        await axios.put(
          `http://localhost:8800/api/video/like/${currentVideo?._id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDislike = async () => {
    if (!user && user === null) {
      navigate("/sign_in");
    } else {
      try {
        await axios.put(
          `http://localhost:8800/api/video/dislike/${currentVideo?._id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${user?.access_token}`,
            },
          }
        );

        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/api/video/delete/${currentVideo?._id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        }
      );

      if (response.status === 200 && response.statusText) {
        toast.info("Video will be delete shortly.");
        setTimeout(() => {
          navigate("/");
        }, 6500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 74px)",
        overflow: "auto",
      }}
    >
      {currentVideo && (
        <CurrentVidContainer>
          <MainVideo>
            <div>
              <VideoPlayer src={currentVideo?.video_url} />
            </div>
            <MainVideoInfo>
              <h2>{currentVideo?.title}</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <UploaderDetail>
                    <UploaderProfileImage>
                      <img
                        src={currentVideo?.userId?.profile_image}
                        alt="profile_image"
                      />
                    </UploaderProfileImage>
                    <div>
                      <span>{currentVideo?.userId?.name}</span>
                      <p>
                        {currentVideo?.userId?.subscribers?.length} Subscribers
                      </p>
                    </div>
                  </UploaderDetail>
                  {currentVideo?.userId?._id === user?.user?._id ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Link
                        to={`/video_edit/${currentVideo?._id}`}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <EditBtn>Edit</EditBtn>
                      </Link>
                      <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
                    </div>
                  ) : (
                    <div>
                      {currentVideo?.userId?.subscribers?.includes(
                        user?.user?._id
                      ) ? (
                        <UnsubscribeBtn onClick={handleUnsubscribe}>
                          Subscribed
                        </UnsubscribeBtn>
                      ) : (
                        <SubscribeBtn onClick={handleSubscribe}>
                          Subscribe
                        </SubscribeBtn>
                      )}
                    </div>
                  )}
                </div>
                <LikeDislikeBtn>
                  <button onClick={handleLike}>
                    {currentVideo?.likes?.includes(user?.user?._id) ? (
                      <BiSolidLike size={24} color="#f1f1f1" />
                    ) : (
                      <BiLike size={24} color="#f1f1f1" />
                    )}
                    {currentVideo?.likes?.length}
                  </button>
                  {"|"}
                  <button onClick={handleDislike}>
                    {currentVideo?.dislikes?.includes(user?.user?._id) ? (
                      <BiSolidDislike size={24} color="#f1f1f1" />
                    ) : (
                      <BiDislike size={24} color="#f1f1f1" />
                    )}
                  </button>
                </LikeDislikeBtn>
              </div>
            </MainVideoInfo>
            <AboutVideo>
              <span>{`${currentVideo?.views} views ${format(
                currentVideo?.createdAt,
                "en_US"
              )}`}</span>
              <p>{currentVideo?.desc}</p>
            </AboutVideo>
          </MainVideo>
          <SimilarVideo>
            {someVideos &&
              someVideos?.map((videos, index) => (
                <div key={index}>
                  <Link
                    to={`/video/${videos?._id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <SimilarVideoThumbnail>
                      <img src={videos?.thumbnail_url} alt="thumbnail_image" />
                    </SimilarVideoThumbnail>
                  </Link>
                  <SimilarVideoInfo>
                    <h3>{videos?.title}</h3>
                    <span>{videos?.userId?.name}</span>
                    <p>{`${videos?.views} views ${format(
                      videos?.createdAt,
                      "en_US"
                    )}`}</p>
                  </SimilarVideoInfo>
                </div>
              ))}
          </SimilarVideo>
        </CurrentVidContainer>
      )}
      <ToastContainer />
    </div>
  );
};

const CurrentVidContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 70% 30%;
  margin-top: 8px;
`;

const MainVideo = styled.div``;

const SimilarVideo = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 20px;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
  }
`;

const VideoPlayer = styled.iframe`
  width: 100%;
  height: 500px;
  border: none;
  border-radius: 20px;
`;

const MainVideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 10px;

  h2 {
    font-size: 1.8rem;
    color: #f1f1f1;
    font-weight: 500;
  }
`;

const UploaderDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  span {
    font-size: 16px;
    font-weight: 500;
    color: #f1f1f1;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    color: #aaaaaa;
  }
`;

const UploaderProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const SubscribeBtn = styled.button`
  height: 36px;
  padding: 0 20px;
  border-radius: 40px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  color: #181818;
  background-color: #f1f1f1;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const LikeDislikeBtn = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: #383838;
  padding: 0 20px;
  border-radius: 40px;
  gap: 10px;

  button {
    background: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 5px;
    color: #f1f1f1;
    font-size: 16px;
    font-weight: 500;
  }
`;

const EditBtn = styled.button`
  height: 36px;
  padding: 0 20px;
  border-radius: 40px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  color: #f1f1f1;
  background-color: blue;
`;

const DeleteBtn = styled.button`
  height: 36px;
  padding: 0 20px;
  border-radius: 40px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  color: #f1f1f1;
  background-color: red;
`;

const UnsubscribeBtn = styled.button`
  height: 36px;
  padding: 0 20px;
  border-radius: 40px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  color: #f1f1f1;
  background-color: #383838;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const AboutVideo = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color: #383838;
  border-radius: 10px;
  padding: 10px;

  span {
    font-size: 14px;
    color: #aaaaaa;
    font-weight: 600;
  }
  p {
    font-size: 16px;
    font-weight: 400;
    color: #f1f1f1;
  }
`;

const SimilarVideoThumbnail = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
`;

const SimilarVideoInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    font-size: 16px;
    color: #f1f1f1;
    font-weight: 600;
  }

  span {
    font-size: 14px;
    color: #aaaaaa;
    font-weight: 500;
  }

  p {
    font-size: 14px;
    color: #aaaaaa;
    font-weight: 400;
  }
`;

export default CurrentVideoPage;
