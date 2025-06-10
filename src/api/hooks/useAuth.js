import { useMutation } from "@tanstack/react-query";
import { authKeys } from "api/keys/authKeys";
import { loginUser } from "api/services/authService";

export const useLogin = () => {
  return useMutation({
    mutationKey: authKeys.login,
    mutationFn: loginUser,
  });
};
