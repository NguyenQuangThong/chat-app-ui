import "./join.css";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();
  const toChatRoom = () => {
    navigate("/chatroom");
  };
  return (
    <div className="join">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <h1>Enter the code to join chat room</h1>
      <TextField id="filled-basic" label="Code" variant="filled" />
      <br></br>
      <br></br>
      <Button variant="contained" onClick={toChatRoom}>
        Join
      </Button>
    </div>
  );
}

export default Join;
