import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    fullName: '',
    email: '',
    contactNo: '',
    password: '',
    preferedContactMethod: '',
    address: '',
    proffession: '',
    eldestRelative: '',
    familySide: '',
    familyName: '',
    role: '',
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
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
    logout: (state, action) => {
      state.isLoggedIn = false;
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

export const { login, logout } = authSlice.actions;

export default authSlice;
