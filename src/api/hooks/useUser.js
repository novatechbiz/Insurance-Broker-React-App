import { useQuery } from "@tanstack/react-query";
import { userKeys } from "api/keys/userKeys";
import { getAllUsers, getUser } from "api/services/userService";

export const useUsers = (options = {}) => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: getAllUsers,
    ...options,
  });
};

export const useUser = (id, options = {}) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUser(id),
    ...options,
  });
};
