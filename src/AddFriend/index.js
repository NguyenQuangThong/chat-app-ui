import "./addFriend.css";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Button } from "@mui/material";
import axios from "axios";

function AddFriend() {
  const [friends, setFriends] = React.useState([]);
  const username = localStorage.getItem("username");

  React.useEffect(() => {
    const getAllFriends = async () => {
      await axios.get(Window.URL + "/accounts").then((response) => {
        setFriends(response.data);
      });
    };
    getAllFriends();
  }, []);

  const avatar = (name) => (
    <Avatar sx={{ width: 36, height: 36, bgcolor: "green" }}>
      {name.charAt(0).toUpperCase()}
    </Avatar>
  );

  const avatar1 = (src) => <Avatar sx={{ width: 36, height: 36 }} src={src} />;

  return (
    <div className="add-friend">
      <h1>Add friend</h1>
      <div className="add-friend-list">
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "greenyellow",
          }}
          subheader={<li />}
        >
          {friends.map((item) => {
            return item.username !== username ? (
              <li key={`section-${item.username}`}>
                <ul>
                  {
                    <ListItem key={`item-${item.username}`}>
                      {item.avatar
                        ? avatar1(item.avatar)
                        : avatar(item.username)}
                      &nbsp;
                      <ListItemText primary={`${item.username}`} />
                      <Button variant="contained">Add</Button>
                    </ListItem>
                  }
                </ul>
              </li>
            ) : (
              ""
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default AddFriend;
