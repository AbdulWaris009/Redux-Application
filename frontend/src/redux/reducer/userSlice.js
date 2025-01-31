import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    loading: false,
    error: null
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/v1/users/get");
        return res.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.getAlluser || []; 
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default userSlice.reducer;
