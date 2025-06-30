// Import Dependencies
import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

// Local Imports
import axios from "utils/axios";
import { isTokenValid, setSession } from "utils/jwt";
import { AuthContext } from "./context";
import { useLogin, useLogout, useRefreshToken, useResetPassword } from "api";

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

  LOGOUT_ERROR: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
  }),

  RESET_PASSWORD_REQUEST: (state) => ({
    ...state,
    isLoading: true,
    errorMessage: null,
  }),

  RESET_PASSWORD_SUCCESS: (state) => ({
    ...state,
    isLoading: false,
  }),

  RESET_PASSWORD_ERROR: (state, action) => ({
    ...state,
    errorMessage: action.payload.errorMessage,
    isLoading: false,
  }),
};

const reducer = (state, action) => {
  const handler = reducerHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate: loginMutation } = useLogin();
  const { mutate: logoutMutation } = useLogout();
  const { mutateAsync: refreshAsync } = useRefreshToken();
  const { mutate: resetPasswordMutation } = useResetPassword();

  useEffect(() => {
    const initializeAuth = async () => {
      const authToken = localStorage.getItem("authToken");

      if (authToken && isTokenValid(authToken)) {
        setSession(authToken);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: true,
            user: JSON.parse(localStorage.getItem("user")) || null,
          },
        });
      } else if (authToken) {
        try {
          const res = await refreshAsync();
          const { token, user } = res.data;

          localStorage.setItem("authToken", token);
          localStorage.setItem("user", JSON.stringify(user));
          setSession(token);

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: JSON.parse(localStorage.getItem("user")) || null,
            },
          });
        } catch {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          setSession(null);
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } else {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initializeAuth();

    // Axios response interceptor
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const res = await refreshAsync();
            const { token, user } = res.data;

            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(user));
            setSession(token);

            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest); // retry failed request
          } catch (refreshError) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            setSession(null);
            dispatch({ type: "LOGOUT" });

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [refreshAsync]);

  const login = (credentials, callbacks = {}) => {
    const { onSuccess, onError } = callbacks;

    dispatch({ type: "LOGIN_REQUEST" });

    loginMutation(credentials, {
      onSuccess: (res) => {
        const { token, user } = res.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setSession(token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user },
        });

        if (onSuccess) onSuccess(res);
      },
      onError: (err) => {
        dispatch({
          type: "LOGIN_ERROR",
          payload: {
            errorMessage: err?.response?.data?.message || "Login failed",
          },
        });

        if (onError) onError(err);
      },
    });
  };

  const logout = (callbacks = {}) => {
    const { onSuccess, onError } = callbacks;

    logoutMutation(undefined, {
      onSuccess: () => {
        console.log("Local storage cleared");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setSession(null);

        dispatch({ type: "LOGOUT" });

        if (onSuccess) onSuccess();
      },
      onError: () => {
        console.error("Logout failed");
        dispatch({
          type: "LOGOUT_ERROR",
          payload: {
            errorMessage: "Logout failed",
          },
        });

        if (onError) onError();
      },
    });
  };

  const resetPassword = (credentials, callbacks = {}) => {
    const { onSuccess, onError } = callbacks;

    dispatch({ type: "RESET_PASSWORD_REQUEST" });

    resetPasswordMutation(credentials, {
      onSuccess: (res) => {
        dispatch({ type: "RESET_PASSWORD_SUCCESS" });
        if (onSuccess) onSuccess(res);
      },
      onError: (err) => {
        dispatch({
          type: "RESET_PASSWORD_ERROR",
          payload: {
            errorMessage:
              err?.response?.data?.message || "Reset password failed",
          },
        });
        if (onError) onError(err);
      },
    });
  };

  if (!children) return null;

  return (
    <AuthContext
      value={{
        ...state,
        login,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
