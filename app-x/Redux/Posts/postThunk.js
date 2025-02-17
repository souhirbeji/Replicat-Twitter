import { createAsyncThunk } from "@reduxjs/toolkit";
import myAxios from "../../Utils/Interceptor";

export const addPost = createAsyncThunk(
  "post/addPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await myAxios.post("api/forum/", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await myAxios.delete(`api/forum/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myAxios.get("/api/posts");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Une erreur est survenue" }
      );
    }
  }
);

export const getPostsBefore = createAsyncThunk(
  "post/getPostsBefore",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { posts, lastTimestamp } = getState().post;
      // Utiliser le timestamp du dernier post ou la date actuelle
      const timestamp = lastTimestamp || Date.now();

      const response = await myAxios.get(`api/forum/before/${timestamp}`);

      // Filtrer les posts pour éviter les doublons
      const newPosts = response.data.filter(
        (newPost) =>
          !posts.some((existingPost) => existingPost._id === newPost._id)
      );

      return newPosts;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data || { message: "Une erreur est survenue" }
      );
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await myAxios.put(`api/forum/${postId}/like`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Une erreur est survenue" }
      );
    }
  }
);
