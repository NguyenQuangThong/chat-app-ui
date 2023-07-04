import { Avatar, Link } from "@mui/material";
import { Grid, Paper, styled } from "@mui/material";
import "./user.css";

function User({ name }) {
  const isTokenNotExpired = (token) => {
    if (token) {
      const tokenParts = token.split(".");
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        if (payload.exp) {
          const expirationTime = payload.exp * 1000;
          const currentTime = Date.now();

          return currentTime < expirationTime;
        }
      }
    }

    return false;
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="user">
      <Item className="user-message">
        <Link href="#" sx={{ textDecoration: "none", color: "black" }}>
          <Grid container spacing={0}>
            <Grid item xs={2}>
              <Avatar>{name}</Avatar>
            </Grid>
            <Grid item xs={10} sx={{ textAlign: "left" }}>
              <b>Username</b>
              <br></br>
              Messages
            </Grid>
          </Grid>
        </Link>
      </Item>
    </div>
  );
}
export default User;
