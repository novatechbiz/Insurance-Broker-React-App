import { useMutation } from "@tanstack/react-query";
import { authKeys } from "api/keys/authKeys";
import { loginUser, logoutUser, refreshToken } from "api/services/authService";

export const useLogin = () => {
  return useMutation({
    mutationKey: authKeys.login,
    mutationFn: loginUser,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: authKeys.logout,
    mutationFn: logoutUser,
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationKey: authKeys.refreshToken,
    mutationFn: refreshToken,
  });
};
