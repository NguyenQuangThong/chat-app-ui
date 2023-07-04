import "./login.css";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { TextField, Button, Alert, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = (success) => {
    setOpen(true);
    setSuccess(success);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") != null &&
      localStorage.getItem("token").length > 0
    )
      navigate("/chatroom");
  });

  const data = {
    username: username,
    password: password,
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post(Window.URL + "/login", data)
      .then((response) => {
        handleClick(true);
        setTimeout(() => {
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("id", response.data.id);
          navigate("/chatroom");
        }, 1000);
      })
      .catch((err) => {
        handleClick(false);
        console.log(err);
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <div className="login-body">
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {success ? "Login successfully !" : "User credentials are wrong !"}
          </Alert>
        </Snackbar>
        <h1>Login</h1>
        <br></br>
        <form onSubmit={handleSignIn}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            sx={{ width: "100%" }}
            required
            onChange={handleUsername}
          />
          <br></br>
          <br></br>
          <FormControl sx={{ width: "100%" }} variant="outlined" required>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              onChange={handlePassword}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <br></br>
          <br></br>
          <Button variant="contained" sx={{ width: "100%" }} type="submit">
            Sign in
          </Button>
        </form>
        <br></br>
        <br></br>
        <div className="footer">
          <div className="left">
            <Link>Forgot your password?</Link>
          </div>
          <div className="right">
            <Link>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
