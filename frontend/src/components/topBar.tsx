import { AppBar, Toolbar, Typography } from "@mui/material";
import { yellow } from "../styles";

const TopBar = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <div
          style={{
            backgroundColor: yellow,
            width: "150px",
            display: "flex",
            justifyContent: "center",
            borderRadius: "5px",
            fontWeight: "bold",
            margin: "15px",
          }}
        >
          <Typography variant="h6" noWrap component="div" color="secondary">
            MOVIE DB
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
