import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTweets = createAsyncThunk("tweets/fetchTweets", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );
  return response.data;
});

export const createTweets = createAsyncThunk(
  "tweets/createTweet",
  async (tweetBody) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/comments",
      { body: tweetBody }
    );
    return response.data;
  }
);

export const updateTweet = createAsyncThunk(
  "tweets/updateTweet",
  async ({ id, body }) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/comments/${id}`,
      body
    );
    return response.data;
  }
);

export const deleteTweet = createAsyncThunk(
  "tweets/deleteTweet",
  async (tweetId) => {
    await axios.delete(
      `https://jsonplaceholder.typicode.com/comments/${tweetId}`
    );
    return tweetId;
  }
);

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTweets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTweets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchTweets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTweets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTweets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createTweets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTweet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTweet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.map((tweet) =>
          tweet.id === action.payload.id
            ? { ...tweet, ...action.payload }
            : tweet
        );
      })
      .addCase(updateTweet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tweetsSlice.reducer;
