import { Container, Box, Avatar, Typography, Grid, Link, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthenticationForm from "../AuthenticationForm";
import IErrors from "@/interfaces/IErrors";
import { IUserData } from "@/interfaces/IUser";

interface Props {
  registerUser: (userData: IUserData) => Promise<void>;
  formErrors: IErrors[];
  error: string | null;
};

const Register = ({ registerUser, error, formErrors }: Props) => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && (
          <Alert sx={{ width: "100%", mt: 2 }} severity="error">
            {error}
          </Alert>
        )}
        <AuthenticationForm
          authMethod="register"
          submitCallback={registerUser}
          errors={formErrors}
        />
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/user/login">
              {"Have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Register;