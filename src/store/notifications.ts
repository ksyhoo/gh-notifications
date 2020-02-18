import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationsState } from "utils/types";

const initialState: NotificationsState = {
  reviewStatus: undefined,
  isUserAuthor: false
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (
      state: NotificationsState,
      { payload }: PayloadAction<any>
    ) => {
      state.reviewStatus = payload;
    }
  }
});

const { actions } = notificationsSlice;
export const { setNotifications } = actions;
