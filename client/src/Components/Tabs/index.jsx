import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { BsDot } from "react-icons/bs";
import { format } from "timeago.js";

const Tabs = () => {
  const [active, setActive] = useState(0);

  const { userVideos, userDetail } = useSelector((state) => state.user);

  useEffect(() => {
    setActive(1);
  }, []);

  return (
    <>
      <TabsContainer>
        <button
          onClick={() => setActive(1)}
          className={active === 1? "active" : ""}
        >
          Videos
        </button>
        <button
          onClick={() => setActive(2)}
          className={active === 2 ? "active" : ""}
        >
          About
        </button>
      </TabsContainer>
      {active === 1 && (
        <VideosContainer>
          {userVideos && userVideos?.map((videos, index) => (
            <div key={index}>
              <VideoThumbnail>
                <img src={videos?.thumbnail_url} alt="thumbnail" />
              </VideoThumbnail>
              <h3>{videos?.title}</h3>
              <p>
                {videos?.views} views <BsDot size={20} color="#b5b5b5" />{" "}
                {format(videos?.createdAt, "en_US")}
              </p>
            </div>
          ))}
        </VideosContainer>
      )}
      {active === 2 && (<AboutContainer>
        <div>
          <h4>Description</h4>
          <p>{userDetail?.about}</p>
        </div>
        <div>
          <span>Stats</span>
          <span>{format(userDetail?.createdAt, "en_US")}</span>
        </div>
      </AboutContainer>)}
    </>
  );
};

const TabsContainer = styled.div`
  width: 100%;
  display: flex;
  max-width: 600px;
  flex-direction: row;
  margin-top: 40px;

  button {
    width: 100%;
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    padding-bottom: 10px;
    font-size: 16px;
    color: #f1f1f1;
    padding-left: 10px;
    height: 40px;
    border-bottom: 1px solid #aaaaaa;
    text-transform: uppercase;
    font-weight: 500;

    &.active {
      border-bottom: 3px solid #f1f1f1;
    }
  }
`;


const VideosContainer = styled.div`
  width: 100%;
  display: grid;
  margin-top: 8px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  margin-top: 24px;

  & > div{
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h3{
  font-size: 16px;
  color: #f1f1f1;
  font-weight: 500;
  margin-top: 10px;
}

p{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #aaaaaa;
  font-weight: 500;
}
  }
`;

const AboutContainer = styled.div`
display: flex;
align-items: flex-start;
flex-direction: row;
justify-content: space-between;
margin-top: calc(24px + 16px);

& > div{
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  h4{
    font-size: 16px;
    font-weight: 400;
    color: #f1f1f1;
  }

  p{
    font-size: 14px;
    font-weight: 400;
    color: #aaaaaa;
    margin-top: 10px;
  }

  span{
    font-size: 16px;
    font-weight: 400;
    color: #f1f1f1;
    padding-bottom: 10px;
    border-bottom: 2px solid #aaaaaa;
    width: 100%;
    margin-bottom:5px;
  }
}
`;

const VideoThumbnail = styled.div`
width: 100%;
height: 180px;
overflow: hidden;
border-radius: 10px;
`;

export default Tabs;
