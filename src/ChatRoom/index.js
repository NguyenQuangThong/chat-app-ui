import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Box,
  styled,
  Paper,
  TextareaAutosize,
  Button,
  Stack,
} from "@mui/material";
import User from "../User";
import "./chatroom.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserAvatar from "../UserAvatar";

function ChatRoom() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const list = ["A", "B", "C"];
  const users = list.map((x) => {
    return (
      <div>
        <User name={x}></User>
        <br></br>
      </div>
    );
  });
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, []);

  return (
    <div className="layout">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <div>
        <h1>MESSENGER</h1>
      </div>
      <div className="user-avt">
        <UserAvatar username={username}></UserAvatar>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <Box sx={{ flexGrow: 1, height: "82vh" }}>
          <Grid2 container spacing={1}>
            <Grid2 xs={6} md={4} sx={{ height: "82vh" }}>
              <Item sx={{ height: "100%" }}>{users}</Item>
            </Grid2>
            <Grid2 xs={6} md={8} sx={{ height: "82vh" }}>
              <Item
                sx={{
                  height: "100%",
                  display: "flex",
                }}
              >
                <Stack spacing={2} sx={{ width: "100%" }}>
                  <Grid2 sx={{ height: "90%" }}>Messages will show here!</Grid2>
                  <Grid2 sx={{ display: "flex" }}>
                    <StyledTextarea
                      aria-label="empty textarea"
                      placeholder="Empty"
                      style={{
                        width: "90%",
                      }}
                    />
                    &nbsp;
                    <Button variant="contained">Send</Button>
                  </Grid2>
                </Stack>
              </Item>
            </Grid2>
          </Grid2>
        </Box>
      </div>
    </div>
  );
}

export default ChatRoom;
