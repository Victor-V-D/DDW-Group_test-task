import IErrors from "@/interfaces/IErrors";
import { IUser } from "@/interfaces/IUser";
import { AnyAction, PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { loginUserFetch, registerUserFetch } from "./authActions";

type State = Readonly<{
  user: IUser | null,
  loading: boolean,
  userDataError: IErrors[]
  error: string | null
}>;

const initialState: State = {
  user: null,
  loading: false,
  userDataError: [],
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.userDataError = [];
      state.error = null;
    },
  },
  extraReducers(builder) {
    const requestsFetch = [registerUserFetch, loginUserFetch,];

    builder
      .addCase(registerUserFetch.fulfilled, (state, action) => {
        state.user = {
          username: action.meta.arg.username,
          token: action.payload.token,
        };
      })
      .addCase(loginUserFetch.fulfilled, (state, action) => {
        state.user = {
          username: action.meta.arg.username,
          token: action.payload.token,
        };
      })
      .addMatcher(
        (action: AnyAction) =>
          requestsFetch
            .map(request => request.pending.type)
            .includes(action.type),
        (state) => {
          state.loading = true;
          state.userDataError = [];
          state.error = null;
        }
      )
      .addMatcher(
        (action: AnyAction) =>
          requestsFetch
            .map(request => request.fulfilled.type)
            .includes(action.type),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action: AnyAction) =>
          requestsFetch
            .map(request => request.rejected.type)
            .includes(action.type),
        (state, action: PayloadAction<IErrors[] | IErrors, string, never, SerializedError>) => {
          state.loading = false;

          if (Array.isArray(action.payload)) state.userDataError = action.payload;
          else if (action.payload) state.error = action.payload.messages[0];
          else state.error = action.error.message || "Unknown error";
        }
      )
  },
});

export const auth = authSlice;
export const { resetAuth } = auth.actions;