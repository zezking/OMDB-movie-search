import { Grid, Typography } from "@mui/material";

const Header = () => {
  return (
    <Grid container justifyContent="center" marginTop={5}>
      <Grid item>
        <Typography variant="h3">Welcome to movie database!</Typography>
      </Grid>
    </Grid>
  );
};
export default Header;
