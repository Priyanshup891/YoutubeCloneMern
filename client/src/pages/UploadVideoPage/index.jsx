import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UploadVideoPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [thumbnailPreview, setThumbnailPreview] = useState();
  const [videoPreview, setVideoPreview] = useState();

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && user === null) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !desc || !image || !file) {
      toast.error("Please fill all the fields.");
    } else {
      const data = new FormData();
      data.append("title", title);
      data.append("desc", desc);
      data.append("image", image);
      data.append("file", file);

      const response = await axios.post(
        "http://localhost:8800/api/video/",
        data,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      if (response.status === 200 && response.statusText) {
        toast.info("Video is being processed, will be uploaded shortly.");
        setTimeout(() => {
          navigate("/");
        }, 6500);
      } else if (response.status !== 200) {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <>
      <UploadContainer>
        <UploadForm onSubmit={handleUpload}>
          <h3>Upload Video</h3>
          <div>
            <label>Video name:</label>
            <input
              type="text"
              name="title"
              placeholder="File Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Video Description:</label>
            <input
              type="text"
              name="desc"
              placeholder="File Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div>
            <label>Video Thumbnail:</label>
            <input
              type="file"
              name="image"
              accept=".jpg, .jpeg, .png"
              placeholder="Thumbnail"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
          <div>
            <label>Video File:</label>
            <input
              type="file"
              name="file"
              accept=".mp4"
              placeholder="File"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setVideoPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
          <button type="submit">Upload</button>
        </UploadForm>
        <UploadedFile>
          <div>
            <p>Your Video Thumbnail:</p>
            <YourVideoThumbnail>
              <img
                src={
                  thumbnailPreview
                    ? thumbnailPreview
                    : "https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png"
                }
                alt="video_thumbnail"
              />
            </YourVideoThumbnail>
          </div>
          <div>
            <p>Your Video:</p>
            <YourVideo>
              <iframe
                src={videoPreview}
                width={"250px"}
              ></iframe>
            </YourVideo>
          </div>
        </UploadedFile>
      </UploadContainer>
      <ToastContainer />
    </>
  );
};

const UploadContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const UploadForm = styled.form`
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

  & > div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    label {
      font-size: 14px;
      color: #f1f1f1;
      margin-bottom: 5px;
    }
    input {
      height: 40px;
      width: 100%;
      border-radius: 5px;
      padding: 0 4px 0 16px;
      background-color: hsla(0, 0%, 100%, 0.05);
      border: 1px solid hsl(0, 0%, 18.82%);
      font-size: 16px;
      font-weight: 400;
      outline: none;
      color: #fff;
      font-family: inherit;
      margin-bottom: 15px;

      &::file-selector-button {
        margin-top: 7px;
      }
    }
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
    margin-top: 10px;
    cursor: pointer;

    &:hover {
      background-color: hsla(0, 0%, 100%, 0.09);
    }
  }
`;

const UploadedFile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  & > div {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    p {
      font-size: 14px;
      color: #f1f1f1;
      margin-bottom: 5px;
    }
  }
`;

const YourVideoThumbnail = styled.div`
  width: 300px;
  height: 150px;
`;

const YourVideo = styled.div``;

export default UploadVideoPage;
