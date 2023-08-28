import React from "react";
import { styled } from "styled-components";
import { GoHomeFill } from "react-icons/go";
import {
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOndemandVideo,
  MdOutlineWatchLater,
} from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { BiLike } from "react-icons/bi";

const SideBar = () => {
  return (
    <SideBarContainer>
      <SideBarContent>
        <UpperPart>
          <button>
            <GoHomeFill size={24} color="#fff" />
            <span>Home</span>
          </button>
          <button>
            <MdOutlineSubscriptions size={24} color="#fff" />
            <span>Subscriptions</span>
          </button>
        </UpperPart>
        <CenterPart>
          <button>
            <MdOutlineVideoLibrary size={24} color="#fff" />
            <span>Library</span>
          </button>
          <button>
            <LuHistory size={24} color="#fff" />
            <span>History</span>
          </button>
          <button>
            <MdOndemandVideo size={24} color="#fff" />
            <span>Your videos</span>
          </button>
          <button>
            <MdOutlineWatchLater size={24} color="#fff" />
            <span>Watch Later</span>
          </button>
          <button>
            <BiLike size={24} color="#fff" />
            <span>Liked videos</span>
          </button>
        </CenterPart>
        <LowerPart>
            <h3>Subscriptions</h3>
        </LowerPart>
      </SideBarContent>
    </SideBarContainer>
  );
};

const SideBarContainer = styled.div`
width: 100%;
height: 100%;
overflow: auto;
`;

const SideBarContent = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;

button{
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 40px;
    border-radius: 10px;
    background: transparent;
    border: none;
    outline: none;
    margin-bottom: 10px;
    cursor: pointer;

    span{
        color: #f1f1f1;
        font-size: 14px;
        margin-left: 13px;
        font-weight: 500;
    }

    &:hover{
        background-color: #282828;
    }
}
`;

const UpperPart = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;
border-bottom: 1px solid #505050;
margin-bottom: 10px;
`;

const CenterPart = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;
border-bottom: 1px solid #505050;
margin-bottom: 10px;
`;

const LowerPart = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;

h3{
    font-size: 16px;
    font-weight: 400;
    margin: 6px 4px 1px;
}
`;

export default SideBar;
