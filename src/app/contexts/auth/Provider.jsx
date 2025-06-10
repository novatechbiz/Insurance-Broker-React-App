// Import Dependencies
import { useEffect, useReducer } from "react";
// import isObject from "lodash/isObject";
// import isString from "lodash/isString";
import PropTypes from "prop-types";

// Local Imports
import axios from "utils/axios";
import { isTokenValid, setSession } from "utils/jwt";
import { AuthContext } from "./context";
import { useLogin } from "api";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  user: null,
};

const reducerHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN_REQUEST: (state) => ({
    ...state,
    isLoading: true,
    errorMessage: null,
  }),

  LOGIN_SUCCESS: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user,
    };
  },

  LOGIN_ERROR: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
    isLoading: false,
  }),

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) => {
  const handler = reducerHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate: loginMutation } = useLogin();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken && isTokenValid(authToken)) {
      setSession(authToken);
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${authToken}`;
        return config;
      });

      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: true,
          user: JSON.parse(localStorage.getItem("user")) || null,
        },
      });
    } else {
      setSession(null);
      dispatch({
        type: "INITIALIZE",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  const login = (credentials) => {
    dispatch({ type: "LOGIN_REQUEST" });

    loginMutation(credentials, {
      onSuccess: (res) => {
        const { token, user } = res;

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setSession(token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user },
        });
      },
      onError: (err) => {
        dispatch({
          type: "LOGIN_ERROR",
          payload: {
            errorMessage: err?.response?.data?.message || "Login failed",
          },
        });
      },
    });
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  if (!children) return null;

  return (
    <AuthContext
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
