import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Config/store";
import { SliceStatus } from "../types";

interface ApplicationState {
  error: string | null;
  loading: SliceStatus;
}

const initialState: ApplicationState = {
  loading: "idle",
  error: null,
};

const application = createSlice({
  name: "application",
  initialState,
  reducers: {},
});

export default application.reducer;
