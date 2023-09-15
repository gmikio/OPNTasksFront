import { createSlice } from '@reduxjs/toolkit';
import { createRandomTask } from '../actions/taskActions';
import { completeTask } from '../actions/taskActions';
import { viewUserCompletedTasks } from '../actions/taskActions';
import { viewAllCompletedTasks } from '../actions/taskActions';
import { cancelTask } from '../actions/taskActions';
import { viewRanking } from '../actions/taskActions';

const initialState = {
  currentTask: null,
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRandomTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRandomTask.fulfilled, (state, action) => {
        state.currentTask = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createRandomTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(completeTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(completeTask.fulfilled, (state) => {
        state.currentTask = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(viewUserCompletedTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(viewUserCompletedTasks.fulfilled, (state, action) => {
        state.completedTasks = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(viewUserCompletedTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(viewAllCompletedTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(viewAllCompletedTasks.fulfilled, (state, action) => {
        state.completedTasks = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(viewAllCompletedTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(cancelTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelTask.fulfilled, (state) => {
        state.currentTask = null;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(cancelTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(viewRanking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(viewRanking.fulfilled, (state, action) => {
        state.currentRanking = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(viewRanking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
