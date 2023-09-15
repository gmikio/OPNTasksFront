const initialState = {
  user: null,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return { ...state, user: action.payload, error: null };
    case 'LOGIN_ERROR':
      return { ...state, user: null, error: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default authReducer;
