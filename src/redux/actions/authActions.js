// actions/authActions.js
export const login = (idn, userName) => {
  return async (dispatch) => {
    try {
      // Dispatch an action to set isLoading to true
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await fetch('http://tasks1-env.eba-tihfzwsy.us-east-1.elasticbeanstalk.com/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idn, userName }),
      });

      if (response.ok) {
        const userInfo = await response.json();

        // Dispatch an action to set the user info
        dispatch({ type: 'SET_USER_INFO', payload: userInfo });

        // Navigate to the Home screen
        navigation.navigate('Home', {
          animationType: 'Stacking',
          idn: inputIDN,
        });
      } else {
        // Handle errors
        dispatch({ type: 'LOGIN_ERROR', payload: 'IDN not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      dispatch({ type: 'LOGIN_ERROR', payload: 'Server connection error' });
    } finally {
      // Dispatch an action to set isLoading to false
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
};
