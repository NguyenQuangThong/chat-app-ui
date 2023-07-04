import "./profile.css";
import { useEffect, useState } from "react";
import { IconButton, Avatar } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getAvatar = async () => {
      await axios
        .get(Window.URL + "/accounts/avatar/" + localStorage.getItem("id"))
        .then((response) => {
          response ? setSelectedImage(response.data) : setSelectedImage(null);
        })
        .catch((err) => console.log(err));
    };
    getAvatar();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      setSelectedImage(URL.createObjectURL(file));
      axios
        .put(Window.URL + "/accounts/" + localStorage.getItem("id"), formData)
        .then(alert("Success"))
        .catch((err) => alert("Failed"));
    }
  };

  const sx = {
    width: "150px",
    height: "150px",
    bgcolor: "green",
    fontSize: "3em",
  };

  const sx1 = {
    width: "150px",
    height: "150px",
  };

  const avatar = (
    <Avatar src={selectedImage} sx={selectedImage ? sx1 : sx}>
      {selectedImage
        ? null
        : localStorage.getItem("username").charAt(0).toUpperCase()}
    </Avatar>
  );

  return (
    <div className="profile">
      <input
        accept="image/*"
        id="avatar-input"
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <label htmlFor="avatar-input">
        <IconButton color="primary" component="span">
          {avatar}
          {/* <PhotoCamera /> */}
        </IconButton>
      </label>
      <h2>{localStorage.getItem("username").toString()}</h2>
    </div>
  );
}

export default Profile;
