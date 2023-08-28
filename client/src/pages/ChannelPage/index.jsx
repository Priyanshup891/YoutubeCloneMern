import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getUserDetail,
  getVideoByUser,
  reset,
} from "../../redux/user/userSlice";
import Tabs from "../../Components/Tabs";
import Loader from "../../Components/Loader";

const ChannelPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { userDetail, userVideos, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUserDetail(id));
    dispatch(getVideoByUser(id));

    return () => dispatch(reset());
  }, [dispatch, id, isError, message]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ChannelContainer>
        <ChannelUserDetail>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <UserProfileImage>
              <img
                src={userDetail && userDetail?.profile_image}
                alt="user_profile"
              />
            </UserProfileImage>
            <UserProfileInfo>
              <span>{userDetail && userDetail?.name}</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "15px",
                }}
              >
                <h4>{userDetail && userDetail?.email}</h4>
                <p>
                  {userDetail && userDetail?.subscribers?.length} subscriber
                </p>
                <p>{userVideos?.length} video</p>
              </div>
            </UserProfileInfo>
          </div>

          <UserActions>
            {user?.user._id === userDetail?._id && (
              <>
                <Link
                  to={`/update_profile/${userDetail && userDetail?._id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <button>Update Profile</button>
                </Link>
                <Link
                  to="/upload_video"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <button>Upload Video</button>
                </Link>
              </>
            )}
          </UserActions>
        </ChannelUserDetail>
        <Tabs />
      </ChannelContainer>
      <ToastContainer />
    </>
  );
};

const ChannelContainer = styled.div`
  width: 100%;
  padding-right: calc((100% - 1070px) / 2);
  padding-left: calc((100% - 1070px) / 2);
  padding-top: 8px;
`;

const ChannelUserDetail = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const UserProfileImage = styled.div`
  width: 128px;
  height: 128px;
  overflow: hidden;
  border-radius: 50%;
`;

const UserProfileInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  span {
    font-size: 24px;
    color: #f1f1f1;
    font-weight: 400;
  }

  h4 {
    font-size: 14px;
    color: #aaaaaa;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: #aaaaaa;
    font-weight: 400;
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 15px;

  button {
    height: 36px;
    padding: 0 30px;
    background-color: #282828;
    border: none;
    outline: none;
    border-radius: 40px;
    font-size: 16px;
    color: #f1f1f1;
    font-weight: 400;
    cursor: pointer;

    &:hover {
      background-color: #383838;
    }
  }
`;

export default ChannelPage;
