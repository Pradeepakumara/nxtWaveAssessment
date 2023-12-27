import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const apiUrl = 'https://apis.ccbp.in/list-creation/lists';

export const fetchListData = createAsyncThunk('list/fetchList', async() => {
    const response = await axios.get(apiUrl);
    return response.data;
});

const listDataSlice = createSlice({
    name: 'listData',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchListData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchListData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }) 
        .addCase(fetchListData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export default listDataSlice.reducer;