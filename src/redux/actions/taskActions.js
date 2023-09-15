// actions/taskActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the async action creator
export const createRandomTask = createAsyncThunk(
  'tasks/createRandomTask',
  async (idn, thunkAPI) => {
    try {
      // API call here
      const response = await fetch(
        `http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Tasks/CreateRandomTask?idn=${idn}`,
        {
          method: 'GET',
        }
      );

      if (response.ok) {
        const taskInfo = await response.json();
        return {
          productName: taskInfo.product.name,
          productAmount: taskInfo.amount,
          instituition: taskInfo.instituition.name,
        };
      } else {
        // Handle error here
        throw new Error('Error generating task');
      }
    } catch (error) {
      // Handle network or other errors here
      throw error;
    }
  }
);

export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (idn, thunkAPI) => {
    try {
      // API call here to complete the task
      const response = await fetch(
        `http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Tasks/completeTask?idn=${idn}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        return null; // Task cancellation was successful
      } else {
        // Handle error here
        throw new Error('Error completing task');
      }
    } catch (error) {
      // Handle network or other errors here
      throw error;
    }
  }
);

export const viewUserCompletedTasks = createAsyncThunk(
  'tasks/viewUserCompletedTasks',
  async (idn, thunkAPI) => {
    try {
      // API call here to fetch user completed tasks
      const response = await fetch(
        `http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Tasks/GetUserCompletedtasks?idn=${idn}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const tasksData = await response.json();
        return tasksData.map((taskData) => ({
          productName: taskData.product.name,
          amount: taskData.amount,
          institutionName: taskData.institution.name,
        }));
      } else {
        // Handle error here
        throw new Error('Error fetching user completed tasks');
      }
    } catch (error) {
      // Handle network or other errors here
      throw error;
    }
  }
);

export const viewAllCompletedTasks = createAsyncThunk(
  'tasks/viewAllCompletedTasks',
  async (_, thunkAPI) => {
    try {
      // API call here to fetch all completed tasks
      const response = await fetch(
        'http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Tasks/GetAllCompletedTasks',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const tasksData = await response.json();
        return tasksData;
      } else {
        // Handle error here
        throw new Error('Error fetching all completed tasks');
      }
    } catch (error) {
      // Handle network or other errors here
      throw error;
    }
  }
);

export const cancelTask = createAsyncThunk(
  'tasks/cancelTask',
  async (idn, thunkAPI) => {
    try {
      // API call here to cancel the task
      const response = await fetch(
        `http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Tasks/CancelTask?idn=${idn}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        return null; // Task cancellation was successful
      } else {
        // Handle error here
        throw new Error('Error canceling task');
      }
    } catch (error) {
      // Handle network or other errors here
      throw error;
    }
  }
);

export const viewRanking = createAsyncThunk(
  'tasks/viewRanking',
  async (_, thunkAPI) => {
    try {
      // API call here to fetch ranking data
      const response = await fetch(
        'http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Tasks/getRanking',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const tasksData = await response.json();
        return tasksData.map((taskData) => ({
          productName: taskData.product.name,
          amount: taskData.amount,
          institutionName: taskData.institution.name,
        }));
      } else {
        // Handle error here
        throw new Error('Error fetching ranking data');
      }
    } catch (error) {
      // Handle network or other errors here
      throw error;
    }
  }
);
