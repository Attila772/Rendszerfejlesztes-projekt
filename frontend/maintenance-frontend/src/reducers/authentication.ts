import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../Config/store";
import { getAccount, postLogout, userLogin } from "../Network/user.api";
import { AuthenticatedUser, GetAccountResponse, SliceStatus } from "../types";
import { getToken, removeToken, saveToken } from "../Util/authToken";

interface AuthenticationState {
  account: AuthenticatedUser;
  status: SliceStatus;
  logoutStatus: SliceStatus;
  error: string | null;
  isAuthenticated: boolean;
  initialized: boolean;
}

const initialState: AuthenticationState = {
  account: {} as AuthenticatedUser,
  status: "idle",
  logoutStatus: "idle",
  error: null,
  isAuthenticated: false,
  initialized: false,
};

function loadingStart(state: AuthenticationState) {
  state.status = "pending";
}

function loadingFailure(
  state: AuthenticationState,
  action: PayloadAction<string>
) {
  state.status = "failure";
  state.error = action.payload;
  state.account = {} as AuthenticatedUser;
  state.isAuthenticated = false;
  state.initialized = true;
}

const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginStart: loadingStart,
    loginSuccess(state, action: PayloadAction<GetAccountResponse>) {
      state.status = "success";
      state.account = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.initialized = true;
    },
    loginFailure: loadingFailure,
    logoutStart(state) {
      state.logoutStatus = "pending";
    },
    logoutFailure(state, action) {
      state.logoutStatus = "failure";
      state.error = action.payload;
    },
    finishInitializing(state) {
      state.initialized = true;
    },
    resetState: () => ({
      ...initialState,
      initialized: true,
    }),
  },
});

export default authentication.reducer;

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutFailure,
  finishInitializing,
  resetState,
} = authentication.actions;

export const RESET_ACTION_TYPE = resetState.type;

export const login =
  (email: string, password: string, rememberMe = false): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(loginStart());
      const { data } = await userLogin(email, password, rememberMe);
      saveToken(data.item, rememberMe);
      dispatch(fetchAccount());
    } catch (e) {
      const error = e as any;
      const responseCode = error?.status || (error?.response?.status ?? 0);
      removeToken();
      if (responseCode === 0) {
        dispatch(loginFailure("hostNotFound"));
        return;
      }
      if (responseCode === 401) {
        dispatch(loginFailure("notActivated"));
        return;
      }
      if (responseCode === 403) {
        dispatch(loginFailure("invalidCredentials"));
        return;
      }
      dispatch(loginFailure("failure"));
    }
  };

export const fetchAccount = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await getAccount();
    dispatch(loginSuccess(data));
  } catch (e) {
    const error = e as any;
    const status = error?.status || (error?.response?.status ?? 0);
    removeToken();

    if (status === 0) {
      dispatch(loginFailure("hostNotFound"));
      return;
    }

    dispatch(loginFailure("failure"));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(logoutStart());
  const token = getToken();
  if (token) {
    try {
      await postLogout();
      removeToken();
      localStorage.removeItem("selectedRelTenant");
      sessionStorage.removeItem("selectedRelTenant");

      dispatch(resetState());
    } catch (error) {
      dispatch(logoutFailure(error));
    }
  } else {
    dispatch(logoutFailure("NO_TOKEN"));
  }
};
