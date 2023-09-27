import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";
// Define your async thunk
interface RegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  // agreeToTerms: boolean;
}
interface LoginData {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return error;
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: LoginData) => {
    try {
      console.log(userData);
      return await authService.login(userData);
    } catch (error) {
      return error;
    }
  }
);
// Define your initial state
const initialState = {
  user: {
    email: "",
    password: "",
  },
  reg: false,
  isAuthenticated: false,
  error: false,
  loading: false,
  success: false,
  message: "",
};

// Create the user slice
const userSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = initialState.user;
      state.error = false;
      state.loading = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.error === "User already exists") {
          state.success = false;
          state.error = true;
          state.message = "Registration not successful";
          toast.error(action.payload.error); // Display the error message
        } else {
          state.success = true;
          state.error = false;
          state.message = "Registration successful";
          toast.success(state.message);
          state.reg = true;
        }
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.message = action.error.message || "Registration failed"; // Set a default error message
        if (state.error === true) {
          toast.error(state.error);
        }
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = false;
        state.success = false;
        // if (state.loading === true) {
        //   toast.loading("pending");
        // }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.message = "Login successful";
        state.user = action.payload;
        console.log("token : ", action.payload);
        if (state.success === true && action.payload.token) {
          localStorage.setItem("token", action.payload.token);

          toast.success("login success", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
          });
          state.isAuthenticated = true;
        } else if (state.reg === true && !action.payload.token) {
          toast.info("Incorrect mail or password", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
          });
        } else {
          toast.error("Account not found! SignUp", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
          });
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.message = action.error.message || "Registration failed"; // Set a default error message
        if (state.error === true) {
          toast.error(state.error);
        }
      });
  },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;
