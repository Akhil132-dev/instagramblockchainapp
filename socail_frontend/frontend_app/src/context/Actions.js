export const Loginstart = (user) => ({
  type: "LOGIN_START",
});
export const Loginsuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const Loginfailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
