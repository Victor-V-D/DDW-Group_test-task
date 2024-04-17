import Login from "@/components/Authentication/Login/Login";
import Preloader from "@/components/UI/Preloader/Preloader";
import { loginUserFetch } from "@/features/auth/authActions";
import { resetAuth } from "@/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { IUserData } from "@/interfaces/IUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginBuilder = () => {
  const { userDataError, error, loading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetAuth())
  }, []);

  const loginUser = async (userData: IUserData): Promise<void> => {
    await dispatch(loginUserFetch(userData))
      .unwrap()
      .then(() => navigate("/"));
  };

  return (
    <>
      {loading && <Preloader show />}
      <Login loginUser={loginUser} error={error} formErrors={userDataError} />
    </>
  )
}

export default LoginBuilder;