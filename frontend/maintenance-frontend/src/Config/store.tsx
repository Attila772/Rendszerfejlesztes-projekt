import authentication from "reducers/authentication";
import application from "reducers/application";
import thunk, { ThunkAction } from "redux-thunk";
import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  authentication,
  application,
});

const store = configureStore({
  reducer: rootReducer,
});

export function setupTestStore(initialState?: RootState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [thunk],
  });
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
