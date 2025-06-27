import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "register",
  initialState: {
    fullName: "",
    email: "",
    contactNo: "",
    password: "",
    preferedContactMethod: "",
    address: "",
    proffession: "",
    eldestRelative: "",
    familySide: "",
    familyName: "",
    role: "member",
  },
  reducers: {
    register: (state, action) => {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.contactNo = action.payload.contactNo;
      state.password = action.payload.password;
      state.preferedContactMethod = action.payload.preferedContactMethod;
      state.address = action.payload.address;
      state.proffession = action.payload.proffession;
      state.eldestRelative = action.payload.eldestRelative;
      state.familySide = action.payload.familySide;
      state.familyName = action.payload.familyName;
      state.role = action.payload.role;
    },
  },
});

export const { register } = authSlice.actions;

export default authSlice;
