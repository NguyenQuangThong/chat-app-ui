import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function UserAvatar({ username }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [avatarUrl, setAvatarUrl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const handleAddFriend = () => {
    setAnchorEl(null);
    navigate("/add");
  };

  const handleFriendRequest = () => {
    setAnchorEl(null);
    navigate("/friend-request");
  };

  const signOut = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(Window.URL + "/accounts/avatar/" + localStorage.getItem("id"))
      .then((response) => {
        response ? setAvatarUrl(response.data) : setAvatarUrl(null);
      })
      .catch((err) => console.log(err));
  }, []);

  const avatar = (
    <Avatar sx={{ width: 36, height: 36, bgcolor: "green" }}>
      {username.charAt(0).toUpperCase()}
    </Avatar>
  );

  const avatar1 = <Avatar sx={{ width: 36, height: 36 }} src={avatarUrl} />;

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {avatarUrl ? avatar1 : avatar}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfile}>
          {avatarUrl ? avatar1 : avatar}
          Profile
        </MenuItem>
        <MenuItem onClick={handleAddFriend}>
          <PersonAddIcon sx={{ width: 27, height: 27 }}></PersonAddIcon>
          &nbsp; Add friend
        </MenuItem>
        <MenuItem onClick={handleFriendRequest}>
          <FormatListBulletedIcon
            sx={{ width: 27, height: 27 }}
          ></FormatListBulletedIcon>
          &nbsp; Friend requests
        </MenuItem>
        <Divider />
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default UserAvatar;
