import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the async action creator
export const createRandomTask = createAsyncThunk(
  'tasks/createRandomTask',
  async (idn, thunkAPI) => {
    try {
      // API call here
      const response = await fetch(
        `http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Tasks/CreateRandomTask?idn=${idn.idn}`,
        {
          method: 'GET',
        }
      );
      console.log("response =", response)
      if (response.ok) {
        const taskInfo = await response.json();
        console.log("taskInfo = ", taskInfo);
        console.log("product name", taskInfo.product.name)
        console.log("product amount", taskInfo.amount)
        console.log("institution", taskInfo.institution.name)
        const respostaEstruturada = {
          productName: taskInfo.product.name,
          productAmount: taskInfo.amount,
          institution: taskInfo.institution.name,
        };
        console.log("depois do console resposta estruturada");
        console.log("resposta estruturada após API call:", respostaEstruturada);
        console.log("depois do console resposta estruturada");
        return {
          productName: taskInfo.product.name,
          productAmount: taskInfo.amount,
          institution: taskInfo.institution.name,
        }
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
