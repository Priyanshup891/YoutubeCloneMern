import React from "react";
import { styled } from "styled-components";
import { BsYoutube, BsThreeDotsVertical } from "react-icons/bs";
import { BiSearch, BiSolidMicrophone } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../../redux/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    toast.error("Checking Out");
    setTimeout(() => {
      dispatch(logout());
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <HeaderContainer>
        <Link to="/" style={{
          textDecoration:"none",
          color:"#fff"
        }}>
        <LeftSide>
          <BsYoutube size={35} color="red" />
          <span>YouTube</span>
        </LeftSide>
        </Link>
        <Center>
          <SearchBar>
            <input type="text" placeholder="Search" />
            <button>
              <BiSearch size={24} color="#fff" />
            </button>
          </SearchBar>
          <MicButton>
            <BiSolidMicrophone size={24} color="#fff" />
          </MicButton>
        </Center>
        <RightSide>
          <BsThreeDotsVertical size={24} color="#fff" />
          {user ? (
            <Menu
              menuButton={
                <Profile>
                  <img src={user?.user?.profile_image} alt="profile_image" />
                </Profile>
              }
              menuStyle={{
                backgroundColor: "#282828",
                color: "#F5F5F5",
                padding: "10px 20px",
              }}
              transition
            >
              <ProfileDetail>
                <Profile>
                  <img src={user?.user?.profile_image} alt="profile_image" />
                </Profile>
                <div>
                  <span>{user?.user?.name}</span>
                  <p>{user.user.email}</p>
                </div>
              </ProfileDetail>
              <Link
                to={`/channel/${user?.user?._id}`}
                style={{
                  textDecoration: "none",
                  color: "#F5F5F5",
                }}
              >
                <SMenuItem>Your Channel</SMenuItem>
              </Link>
              <SMenuItem onClick={handleLogout}>Sign out</SMenuItem>
            </Menu>
          ) : (
            <Link
              to="/sign_in"
              style={{
                textDecoration: "none",
              }}
            >
              <button>
                <CgProfile size={25} color="#3ea6ff" />
                <span>Sign in</span>
              </button>
            </Link>
          )}
        </RightSide>
      </HeaderContainer>
      <ToastContainer />
    </>
  );
};

const HeaderContainer = styled.nav`
  width: 100%;
  height: 56px;
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 5px;

  span {
    font-size: 1.5rem;
    font-weight: 600;
    font-family: "Fjalla One", sans-serif;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 35%;
  justify-content: space-between;
  gap: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;

  input {
    height: 40px;
    width: 100%;
    border-radius: 40px 0 0 40px;
    padding: 0 4px 0 16px;
    background-color: hsl(0, 0%, 7%);
    border: 1px solid hsl(0, 0%, 18.82%);
    font-size: 16px;
    font-weight: 400;
    outline: none;
    color: #fff;
    font-family: inherit;
  }

  button {
    height: 40px;
    width: 64px;
    border-radius: 0 40px 40px 0;
    background-color: hsla(0, 0%, 100%, 0.08);
    border: 1px solid hsl(0, 0%, 18.82%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MicButton = styled.button`
  height: 40px;
  width: 47px;
  display: flex;
  background-color: hsla(0, 0%, 100%, 0.08);
  border: 1px solid hsl(0, 0%, 18.82%);
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const Profile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid hsl(0, 0%, 18.82%);
`;

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;

  & > div {
    span {
      font-size: 16px;
      font-size: 500;
      color: #f5f5f5;
    }

    p {
      font-size: 16px;
      font-size: 500;
      color: #f5f5f5;
    }
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;

  button {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    height: 40px;
    padding: 0 10px;
    border-radius: 40px;
    background-color: hsla(0, 0%, 100%, 0.05);
    border: 1px solid hsl(0, 0%, 18.82%);
    cursor: pointer;

    &:hover {
      background-color: #3ea5ff6c;
    }

    span {
      font-size: 16px;
      font-weight: 400;
      color: #3ea6ff;
    }
  }
`;

const SMenuItem = styled(MenuItem)`
  &:hover {
    background-color: #303030;
  }
`;

export default Header;
