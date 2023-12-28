import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://apis.ccbp.in/list-creation/lists";

export const fetchListData = createAsyncThunk("list/fetchList", async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

const listDataSlice = createSlice({
  name: "listData",
  initialState: {
    data: null,
    loading: false,
    error: null,
    selected: [],
    mode: "read",
    tempData: null,
    alert: null,
    newList: null
  },
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    setTempData(state, action) {
      state.tempData = action.payload;
    },
    setAlert(state, action) {
      state.alert = action.payload;
    },
    setData(state, action) {
        state.data = action.payload;
      },
      setNewList(state, action) {
        state.newList = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListData.fulfilled, (state, action) => {
        state.loading = false;
        let modifiedData = action.payload.lists;
        modifiedData = modifiedData.reduce((acc, cum) => {
          if (acc.hasOwnProperty(cum.list_number)) {
            return {
              ...acc,
              [cum.list_number]: [...acc[cum.list_number] , cum],
            };
          } else {
            return { ...acc, [cum.list_number]: [cum] };
          }
        }, {});
        state.data = modifiedData;
      })
      .addCase(fetchListData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelected, setMode, setTempData, setAlert, setData, setNewList } =
  listDataSlice.actions;

export default listDataSlice.reducer;
