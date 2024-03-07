import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAlbumsWithPhotos = createAsyncThunk(
  "albums/fetchAlbums",
  async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const albums = response.data;

      const albumsWithPhotos = await Promise.all(
        albums.map(async (album) => {
          const photoResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
          );
          const photos = photoResponse.data;

          return {
            ...album,
            photos,
          };
        })
      );

      return albumsWithPhotos;
    } catch (error) {
      throw error;
    }
  }
);

const albumSlice = createSlice({
  name: "albums",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsWithPhotos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlbumsWithPhotos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAlbumsWithPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default albumSlice.reducer;
