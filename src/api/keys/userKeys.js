export const userKeys = {
  all: ["users"],
  list: () => [...userKeys.all, "list"],
  detail: (id) => [...userKeys.all, "detail", id],
};
