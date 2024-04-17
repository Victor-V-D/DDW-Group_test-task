import axiosForum from "@/api/axiosForum";
import { loginURL, registerURL } from "@/constants";
import IErrors from "@/interfaces/IErrors";
import { IUser, IUserData } from "@/interfaces/IUser";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";

interface IAuthApiResponse extends Pick<IUser, "token"> { };

export const registerUserFetch = createAsyncThunk<
  IAuthApiResponse,
  IUserData,
  { rejectValue: IErrors[] | IErrors }
>("register/fetch/book", async (userData, thunkAPI) => {
  try {
    const { data } = await axiosForum.post<IAuthApiResponse>(registerURL, userData);
    return data;

  } catch (err) {
    if (isAxiosError(err)) {
      const error: AxiosError<IErrors[] | IErrors> = err;
      if (error.response) return thunkAPI.rejectWithValue(error.response.data);
    }
    throw err;
  }
});

export const loginUserFetch = createAsyncThunk<
  IAuthApiResponse,
  IUserData,
  { rejectValue: IErrors[] | IErrors }
>("login/fetch/book", async (userData, thunkAPI) => {
  try {
    const { data } = await axiosForum.post<IAuthApiResponse>(loginURL, userData);
    return data;

  } catch (err) {
    if (isAxiosError(err)) {
      const error: AxiosError<IErrors[] | IErrors> = err;
      if (error.response) return thunkAPI.rejectWithValue(error.response.data);
    }
    throw err;
  }
}); 