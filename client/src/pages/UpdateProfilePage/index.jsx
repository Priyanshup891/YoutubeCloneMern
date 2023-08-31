import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "styled-components";
import axios from "axios";

const UpdateProfilePage = () => {
  const { id } = useParams();
  const [file, setFile] = useState();
  const [about, setAbout] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState(
    "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
  );

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && user === null) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("about", about);

    const response = await axios.put(
      `http://localhost:8800/api/user/update/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    );

    if (response.status === 200 && response.statusText) {
      toast.info("Profile update is being processed, will be updated shortly.");
      setTimeout(() => {
        navigate(`/channel/${id}`);
      }, 6500);
    } else if (response.status !== 200) {
      toast.error("Something is wrong.");
    }
  };

  return (
    <>
      <UpdateProContainer>
        <UpdateForm onSubmit={handleUpdate}>
          <h3>Update Profile</h3>
          <FormWrapper>
            <label>Profile Image:</label>
            <div>
              <ProfilePreview>
                <img src={profileImagePreview} alt="profile_image_preview" />
              </ProfilePreview>
              <input
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                placeholder="Profile Image"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setProfileImagePreview(
                    URL.createObjectURL(e.target.files[0])
                  );
                }}
              />
            </div>
          </FormWrapper>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <label>About:</label>
            <textarea
              placeholder="About Yourself"
              name="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <button type="submit">Update</button>
        </UpdateForm>
      </UpdateProContainer>
      <ToastContainer />
    </>
  );
};

const UpdateProContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UpdateForm = styled.form`
  background-color: hsl(0, 0%, 7%);
  border: 1px solid hsl(0, 0%, 18.82%);
  border-radius: 10px;
  padding: 20px 40px;

  h3 {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
  }

  label {
    font-size: 14px;
    color: #f1f1f1;
    margin-bottom: 5px;
  }

  input {
    height: 40px;
    border-radius: 5px;
    padding: 0 4px 0 16px;
    background-color: hsla(0, 0%, 100%, 0.05);
    border: 1px solid hsl(0, 0%, 18.82%);
    font-size: 16px;
    font-weight: 400;
    outline: none;
    color: #fff;
    font-family: inherit;

    &::file-selector-button {
      margin-top: 7px;
    }
  }

  textarea {
    height: 150px;
    width: 100%;
    border-radius: 5px;
    padding: 10px 4px 0 16px;
    background-color: hsla(0, 0%, 100%, 0.05);
    border: 1px solid hsl(0, 0%, 18.82%);
    font-size: 16px;
    font-weight: 400;
    outline: none;
    color: #fff;
    font-family: inherit;
    margin-top: 5px;
  }

  button {
    height: 40px;
    width: 100%;
    border-radius: 5px;
    background-color: hsla(0, 0%, 100%, 0.2);
    border: 1px solid hsl(0, 0%, 18.82%);
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
    cursor: pointer;

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.09);
    }
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;

  & > div {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 5px;
  }
`;

const ProfilePreview = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
`;

export default UpdateProfilePage;
