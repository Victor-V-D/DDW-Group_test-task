import Register from "@/components/Authentication/Register/Register";
import Preloader from "@/components/UI/Preloader/Preloader";
import { registerUserFetch } from "@/features/auth/authActions";
import { resetAuth } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { IUserData } from "@/interfaces/IUser"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const RegisterBuilder = () => {
  const { userDataError, error, loading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetAuth())
  }, []);

  const registerUser = async (userData: IUserData): Promise<void> => {
    await dispatch(registerUserFetch(userData))
      .unwrap()
      .then(() => navigate("/"));
  };
  return (
    <>
      {loading && <Preloader show />}
      <Register registerUser={registerUser} error={error} formErrors={userDataError} />
    </>
  )
}

export default RegisterBuilder