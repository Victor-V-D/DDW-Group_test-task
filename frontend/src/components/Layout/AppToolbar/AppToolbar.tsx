import { useAppSelector } from "@/hooks/hooks";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const AppToolbar = () => {
  const { user } = useAppSelector(state => state.auth);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent={"space-between"}>
            <Typography
              variant="h6"
              component={Link}
              to={"/"}
              sx={{ color: "inherit", textDecoration: "none", ["&:hover"]: { color: "inherit" }, }}
            >
              Library
            </Typography>
            {user ? (
              <Grid item>
                <Typography px={1} sx={{ display: "inline", borderRight: "1px solid #fff" }}>
                  Hello, <Typography variant="caption" fontSize={17} fontWeight={700} color={"#A9A9A9"}>{user.username}</Typography>
                </Typography>
                <Button component={Link} to={"/book/create"}>
                  Add new book
                </Button>
                <Button component={Link} to={"user/login"}>
                  Logout
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button component={Link} to={"user/register"}>
                  Sing Up
                </Button>
                <Button component={Link} to={"user/login"}>
                  Sing In
                </Button>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component={Toolbar} marginBottom={2} />
    </>
  );
};

export default AppToolbar;
