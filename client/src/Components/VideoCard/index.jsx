import React from "react";
import { styled } from "styled-components";
import { BsDot } from "react-icons/bs";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";

const VideoCard = ({ videos, index }) => {
  const handleIncView = async () => {
    try {
      await axios.put(`http://localhost:8800/api/video/view/${videos?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VideoCardContainer key={index}>
      <Link
        onClick={handleIncView}
        to={`/video/${videos?._id}`}
        style={{
          textDecoration: "none",
        }}
      >
        <VideoCardMedia>
          <img src={videos?.thumbnail_url} alt="thumbnail" />
        </VideoCardMedia>
      </Link>
      <VideCardContent>
        <Link
          to={`/channel/${videos?.userId?._id}`}
          style={{
            textDecoration: "none",
          }}
        >
          <UserProfileImage>
            <img src={videos?.userId?.profile_image} alt="profile_image" />
          </UserProfileImage>
        </Link>
        <div>
          <h3>{videos?.title}</h3>
          <p>{videos?.userId?.name}</p>
          <p>
            {videos?.views} views <BsDot size={20} color="#b5b5b5" />{" "}
            {format(videos?.createdAt, "en_US")}
          </p>
        </div>
      </VideCardContent>
    </VideoCardContainer>
  );
};

const VideoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const VideoCardMedia = styled.div`
  width: 100%;
  height: 240px;
  overflow: hidden;
  border-radius: 10px;
`;

const VideCardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  margin-top: 10px;

  h3 {
    font-size: 16px;
    color: #f1f1f1;
    font-weight: 500;
  }

  p {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #aaaaaa;
    font-weight: 500;
  }
`;

const UserProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
`;

export default VideoCard;
