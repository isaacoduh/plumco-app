import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API_URL } from "@/lib/constants";

const initialState = { isLoading: false, addressList: [] };

export const addNewAddress = createAsyncThunk(
  "/addressses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${BASE_API_URL}/addresses/add`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `${BASE_API_URL}/addresses/get/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  "/addresses/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${BASE_API_URL}/addresses/update/${userId}/${addressId}`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${BASE_API_URL}/addresses/delete/${userId}/${addressId}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        (state.isLoading = false), (state.addressList = []);
      });
  },
});

export default addressSlice.reducer;
