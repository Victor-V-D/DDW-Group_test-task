import { fetchBook } from "@/features/book/bookSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  AppBar,
  Box,
  Button,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const AppToolbar = () => {
  const { user } = useAppSelector(state => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    dispatch(fetchBook(searchQuery));
  };

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

            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />

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
